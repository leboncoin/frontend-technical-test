import type { Conversation } from '@/types/conversation'
import { byLastMessageDesc } from '@utils/conversation'
import { ApiError, apiRequest, pathParam, postJson } from './http'
import { isRecord, toId, toMsTimestamp, toNonEmptyString } from './normalize'

/**
 * Maps one wire row (as documented in docs/api-swagger.yaml and returned by
 * json-server) to a domain conversation. External values are treated as
 * untrusted and normalized before leaving this module.
 */
function mapConversation(dto: unknown): Conversation | null {
  if (!isRecord(dto)) return null

  const id = toId(dto.id)
  const senderId = toId(dto.senderId)
  const recipientId = toId(dto.recipientId)
  const senderNickname = toNonEmptyString(dto.senderNickname)
  const recipientNickname = toNonEmptyString(dto.recipientNickname)

  if (
    id === null ||
    senderId === null ||
    recipientId === null ||
    senderNickname === null ||
    recipientNickname === null
  ) {
    // A malformed row should not take the whole inbox down; skip it.
    return null
  }

  // Conversations without a valid timestamp are placed at the end.
  const lastMessageTimestamp = toMsTimestamp(dto.lastMessageTimestamp) ?? 0

  return {
    id,
    senderId,
    senderNickname,
    recipientId,
    recipientNickname,
    lastMessageTimestamp,
  }
}

export async function fetchConversations(
  userId: number
): Promise<Conversation[]> {
  const payload = await apiRequest<unknown>(
    `/conversations/${pathParam(userId)}`
  )

  if (!Array.isArray(payload)) {
    throw new ApiError('Unexpected conversations payload from the server.')
  }

  return payload
    .map(mapConversation)
    .filter((conversation): conversation is Conversation => conversation !== null)
    .sort(byLastMessageDesc)
}

export interface CreateConversationInput {
  loggedUserId: number
  loggedUserNickname: string
  recipientId: number
  recipientNickname: string
}

/**
 * Creates a conversation and returns the resulting domain conversation.
 *
 * The Swagger body only documents `recipientId`, but the fixture backend
 * persists exactly what it receives. The additional fields are therefore
 * included so the created conversation remains compatible with the fixture's
 * list/filtering behavior. A real backend would normally derive these fields
 * server-side from the authenticated user and recipient.
 */
export async function createConversation(
  input: CreateConversationInput
): Promise<Conversation> {
  const normalizedSenderNickname = toNonEmptyString(input.loggedUserNickname)
  const normalizedRecipientNickname = toNonEmptyString(input.recipientNickname)

  if (
    normalizedSenderNickname === null ||
    normalizedRecipientNickname === null
  ) {
    throw new ApiError('Conversation participants must have valid names.')
  }

  const nowSeconds = Math.floor(Date.now() / 1000)
  const nowMs = nowSeconds * 1000

  const payload = await postJson<unknown>(
    `/conversations/${pathParam(input.loggedUserId)}`,
    {
      recipientId: input.recipientId,
      senderId: input.loggedUserId,
      senderNickname: normalizedSenderNickname,
      recipientNickname: normalizedRecipientNickname,
      // Fixture timestamps are Unix seconds.
      lastMessageTimestamp: nowSeconds,
    }
  )

  const id = isRecord(payload) ? toId(payload.id) : null

  if (id === null) {
    throw new ApiError('The server did not confirm the created conversation.')
  }

  return {
    id,
    senderId: input.loggedUserId,
    senderNickname: normalizedSenderNickname,
    recipientId: input.recipientId,
    recipientNickname: normalizedRecipientNickname,
    lastMessageTimestamp: nowMs,
  }
}

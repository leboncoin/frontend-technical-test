import type { Message } from '@/types/message'
import { ApiError, apiRequest, pathParam, postJson } from './http'
import { isRecord, toId, toMsTimestamp, toNonEmptyString } from './normalize'

function mapMessage(dto: unknown): Message | null {
  if (!isRecord(dto)) return null

  const id = toId(dto.id)
  const conversationId = toId(dto.conversationId)
  const authorId = toId(dto.authorId)
  const body = toNonEmptyString(dto.body)
  const timestamp = toMsTimestamp(dto.timestamp)

  if (
    id === null ||
    conversationId === null ||
    authorId === null ||
    body === null ||
    timestamp === null
  ) {
    return null
  }

  return {
    id,
    conversationId,
    authorId,
    timestamp,
    body,
  }
}

function byTimestampAsc(a: Message, b: Message): number {
  return a.timestamp - b.timestamp || a.id - b.id
}

export async function fetchMessages(
  conversationId: number
): Promise<Message[]> {
  const payload = await apiRequest<unknown>(
    `/messages/${pathParam(conversationId)}`
  )

  if (!Array.isArray(payload)) {
    throw new ApiError('Unexpected messages payload from the server.')
  }

  return payload
    .map(mapMessage)
    .filter((message): message is Message => message !== null)
    .sort(byTimestampAsc)
}

export async function sendMessage(
  conversationId: number,
  authorId: number,
  body: string
): Promise<Message> {
  const normalizedBody = toNonEmptyString(body)

  if (normalizedBody === null) {
    throw new ApiError('Message body cannot be empty.')
  }

  const sentAtSeconds = Math.floor(Date.now() / 1000)

  const payload = await postJson<unknown>(
    `/messages/${pathParam(conversationId)}`,
    {
      conversationId,
      authorId,
      body: normalizedBody,
      timestamp: sentAtSeconds,
    }
  )

  const id = isRecord(payload) ? toId(payload.id) : null

  if (id === null) {
    throw new ApiError('The server did not confirm the sent message.')
  }

  return {
    id,
    conversationId,
    authorId,
    timestamp: sentAtSeconds * 1000,
    body: normalizedBody,
  }
}

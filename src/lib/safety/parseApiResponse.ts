import type { Conversation, Message, User, UserPublic } from '@/types'

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

const isFiniteNumber = (value: unknown): value is number =>
  typeof value === 'number' && Number.isFinite(value)

export const isConversation = (value: unknown): value is Conversation => {
  if (!isRecord(value)) return false
  return (
    isFiniteNumber(value.id) &&
    isFiniteNumber(value.senderId) &&
    typeof value.senderNickname === 'string' &&
    isFiniteNumber(value.recipientId) &&
    typeof value.recipientNickname === 'string' &&
    isFiniteNumber(value.lastMessageTimestamp)
  )
}

export const isMessage = (value: unknown): value is Message => {
  if (!isRecord(value)) return false
  return (
    isFiniteNumber(value.id) &&
    isFiniteNumber(value.conversationId) &&
    isFiniteNumber(value.authorId) &&
    isFiniteNumber(value.timestamp) &&
    typeof value.body === 'string'
  )
}

const isUser = (value: unknown): value is User => {
  if (!isRecord(value)) return false
  return (
    isFiniteNumber(value.id) &&
    typeof value.nickname === 'string' &&
    typeof value.token === 'string'
  )
}

export const parseConversations = (data: unknown): Conversation[] => {
  if (!Array.isArray(data)) return []
  return data.filter(isConversation)
}

export const parseMessages = (data: unknown): Message[] => {
  if (!Array.isArray(data)) return []
  return data.filter(isMessage)
}

export const parseUsers = (data: unknown): UserPublic[] => {
  if (!Array.isArray(data)) return []
  return data.filter(isUser).map(({ id, nickname }) => ({ id, nickname }))
}

export const parseCreateIdResponse = (data: unknown): number | null => {
  if (!isRecord(data) || !isFiniteNumber(data.id)) return null
  return data.id
}

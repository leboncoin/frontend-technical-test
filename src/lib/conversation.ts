import type { Conversation } from '@/types'

export const getContactId = (conversation: Conversation, loggedUserId: number): number =>
  conversation.senderId === loggedUserId ? conversation.recipientId : conversation.senderId

export const getContactNickname = (conversation: Conversation, loggedUserId: number): string =>
  conversation.senderId === loggedUserId
    ? conversation.recipientNickname
    : conversation.senderNickname

export const canAccessConversation = (conversation: Conversation, userId: number): boolean =>
  conversation.senderId === userId || conversation.recipientId === userId

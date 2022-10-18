import { z } from 'zod'
import { Correspondent } from './correspondent'

export interface ConversationType {
  id: number
  recipientId: number
  recipientNickname: string
  senderId: number
  senderNickname: string
  lastMessageTimestamp: number
}

export const ConversationData = z.object({
  id: z.number(),
  recipientId: z.number(),
  recipientNickname: z.string(),
  senderId: z.number(),
  senderNickname: z.string(),
  lastMessageTimestamp: z.number(),
})

export interface ExtendedConversation extends Conversation {
  correspondent: Correspondent
}

export const ConversationsArray = z.array(ConversationData)

import { z } from 'zod'

export interface Message {
  id: number
  conversationId: number
  authorId: number
  timestamp: number
  body: string
}

export const MessageData = z.object({
  id: z.number(),
  conversationId: z.number(),
  authorId: z.number(),
  timestamp: z.number(),
  body: z.string(),
})

export const MessagesArray = MessageData.array()

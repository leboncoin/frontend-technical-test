import { Message } from '@Types/message'

export const messageBubbleStubs: Message = {
  id: 1,
  conversationId: 1,
  authorId: 1,
  timestamp: Math.floor(Date.now() / 1000),
  body: 'Hello',
}

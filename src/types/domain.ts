export interface Conversation {
  id: number
  recipientId: number
  recipientNickname: string
  senderId: number
  senderNickname: string
  lastMessageTimestamp: number
}

export interface Message {
  id: number
  conversationId: number
  authorId: number
  timestamp: number
  body: string
}

export interface User {
  id: number
  nickname: string
  token: string
}

export type UserPublic = Omit<User, 'token'>

export interface SendMessageVariables {
  conversationId: number
  userId: number
  body: string
  timestamp: number
}

export interface SendMessageContext {
  previousMessages?: Message[]
}

export interface CreateConversationVariables {
  userId: number
  recipientId: number
}

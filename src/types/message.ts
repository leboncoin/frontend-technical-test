export interface Message {
  id: number
  conversationId: number
  authorId: number
  timestamp: number
  body: string
}

export interface MessageInputValues {
  body: string,
  authorId: number,
  conversationId: number,
}

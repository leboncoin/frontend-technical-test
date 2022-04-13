export interface Message {
  id: number
  conversationId: number
  authorId: number
  timestamp: number
  body: string
}

export interface FormattedMessage extends Message {
  authorName: string
  isMyself: boolean
}
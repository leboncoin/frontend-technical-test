export interface Conversation {
  id: number
  recipientId: number
  recipientNickname: string
  senderId: number
  senderNickname: string
  lastMessageTimestamp: number
}
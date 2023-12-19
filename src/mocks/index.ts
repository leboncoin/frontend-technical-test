import { Conversation } from '@/types/conversation'
import { Message } from '@/types/message'
import { User } from '@/types/user'

export const user: User = {
  id: 99,
  nickname: 'Marie',
  token: 'xxxx',
}

export const message: Message = {
  id: 99,
  conversationId: 99,
  timestamp: 1625637849,
  authorId: 99,
  body: "Bonjour c'est le premier message de la première conversation",
}

export const conversation: Conversation = {
  id: 99,
  recipientId: 999,
  recipientNickname: 'John',
  senderId: 99,
  senderNickname: 'Marie',
  lastMessageTimestamp: 1625637849,
}

export const conversations: Conversation[] = [
  {
    id: 1,
    recipientId: 2,
    recipientNickname: 'Jeremie',
    senderId: 1,
    senderNickname: 'Thibaut',
    lastMessageTimestamp: 1625637849,
  },
  {
    id: 2,
    recipientId: 3,
    recipientNickname: 'Patrick',
    senderId: 1,
    senderNickname: 'Thibaut',
    lastMessageTimestamp: 1620284667,
  },
  {
    id: 3,
    recipientId: 1,
    recipientNickname: 'Thibaut',
    senderId: 4,
    senderNickname: 'Elodie',
    lastMessageTimestamp: 1625648667,
  },
  conversation,
]

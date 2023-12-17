import { Conversation } from '@/types/conversation'
import { Message } from '@/types/message'
import { SERVER_URL } from '@/utils/constants'

export async function getConversations(
  userId: number
): Promise<Conversation[]> {
  const res = await fetch(`${SERVER_URL}/conversations/${userId}`)
  return res.json()
}

export async function getMessages(conversationId: number): Promise<Message[]> {
  const res = await fetch(`${SERVER_URL}/messages/${conversationId}`)
  return res.json()
}

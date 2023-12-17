import { SERVER_URL } from '@/utils/constants'

export async function getConversations(userId: number) {
  const res = await fetch(`${SERVER_URL}/conversations/${userId}`)
  return res.json()
}

export async function getConversation(conversationId: number) {
  const res = await fetch(`${SERVER_URL}/messages/${conversationId}`)
  return res.json()
}

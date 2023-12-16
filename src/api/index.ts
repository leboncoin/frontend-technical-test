import { SERVER_URL } from '@/utils/constants'

export async function getConversations(id: number) {
  const res = await fetch(`${SERVER_URL}/conversations/${id}`)
  return res.json()
}

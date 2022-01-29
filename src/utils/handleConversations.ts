import { Conversation } from '../types/conversation'

export const fetchConversations = async (
  id: string
): Promise<Conversation[]> => {
  try {
    const res = await fetch(`http://localhost:3005/conversations/${id}`)

    return (await res.json()) as Conversation[]
  } catch (err) {
    console.log(`Error: ${err}`)
    return {} as Conversation[]
  }
}

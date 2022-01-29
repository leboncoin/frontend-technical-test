import { Message } from '../types/message'

export type NewMessage = Omit<Message, 'id'>

export const fetchMessages = async (id: string): Promise<Message[]> => {
  try {
    const res = await fetch(`http://localhost:3005/messages/${id}`)

    return (await res.json()) as Message[]
  } catch (err) {
    console.log(`Error: ${err}`)
    return {} as Message[]
  }
}

export const createMessage = async (message: NewMessage): Promise<Message> => {
  try {
    const res = await fetch(`http://localhost:3005/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    })

    return (await res.json()) as Message
  } catch (err) {
    console.log(`Error: ${err}`)
    return {} as Message
  }
}

import { useCallback, useState } from 'react'
import axios from 'axios'

import { Message } from '@Types/message'

type UseMessagesType = {
  isLoading: boolean
  getMessages: (conversationID: string) => Promise<Message[]>
  deleteMessage: (messageID: number) => Promise<void>
  addMessage: (message: NewMessage) => Promise<Message>
}

export type NewMessage = Omit<Message, 'id'>

export const useMessages = (): UseMessagesType => {
  const [isLoading, setisLoading] = useState(false)

  const getMessages = useCallback(async (conversationID: string): Promise<Message[]> => {
    try {
      setisLoading(true)
      const res = await axios({
        method: 'get',
        url: `http://localhost:3005/messages/${conversationID}`,
      })

      return res.data as Message[]
    } catch (err) {
      console.error(err)

      return []
    } finally {
      setisLoading(false)
    }
  }, [])

  const addMessage = useCallback(async (message: NewMessage): Promise<Message> => {
    const { conversationId } = message

    try {
      setisLoading(true)
      const res = await axios({
        method: 'post',
        url: `http://localhost:3005/messages/${conversationId}`,
        data: message,
      })

      return res.data as Message
    } catch (err) {
      console.error(err)

      return {} as Message
    } finally {
      setisLoading(false)
    }
  }, [])

  const deleteMessage = useCallback(async (messageID: number): Promise<void> => {
    try {
      await axios({
        method: 'DELETE',
        url: `http://localhost:3005/messages/${messageID}`,
      })
    } catch (err) {
      console.error(err)
    }
  }, [])

  return {
    isLoading,
    getMessages,
    deleteMessage,
    addMessage,
  }
}

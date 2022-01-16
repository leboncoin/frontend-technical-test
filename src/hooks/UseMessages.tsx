import { useCallback, useState } from 'react'
import axios from 'axios'

import { Message } from '@Types/message'

type UseMessagesType = {
  isLoading: boolean
  getMessages: (conversationID: string) => Promise<Message[]>
  deleteMessage: (messageID: string) => Promise<void>
  addMessage: (message: NewMessage, conversationID: number) => Promise<boolean>
}

type NewMessage = {
  body: string
  timestamp: number
}

export const UseMessages = (): UseMessagesType => {
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

  const addMessage = useCallback(async (message: NewMessage, conversationID: number): Promise<boolean> => {
    try {
      setisLoading(true)
      await axios({
        method: 'post',
        url: `http://localhost:3005/messages/${conversationID}`,
        data: message,
      })

      return true
    } catch (err) {
      console.error(err)

      return false
    } finally {
      setisLoading(false)
    }
  }, [])

  const deleteMessage = useCallback(async (messageID: string): Promise<void> => {
    try {
      await axios({
        method: 'delete',
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

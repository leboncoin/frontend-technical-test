import { useCallback, useState } from 'react'
import axios from 'axios'

import { Message } from '@Types/message'

type UseMessagesType = {
  isLoading: boolean
  getConversations: (conversationID: string) => Promise<Message[]>
}

export const UseMessages = (): UseMessagesType => {
  const [isLoading, setisLoading] = useState(false)

  const getConversations = useCallback(async (conversationID: string): Promise<Message[]> => {
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

  return {
    isLoading,
    getConversations,
  }
}

import { useCallback, useState } from 'react'
import axios from 'axios'
import { Conversation } from 'src/types/conversation'

type UseConversationType = {
  isLoading: boolean
  getConversations: (userId: string) => Promise<Conversation[]>
}

export const useConversations = (): UseConversationType => {
  const [isLoading, setisLoading] = useState(false)

  const getConversations = useCallback(async (userId: string): Promise<Conversation[]> => {
    try {
      setisLoading(true)
      const res = await axios({
        method: 'get',
        url: `http://localhost:3005/conversations/${userId}`,
      })

      return res.data as Conversation[]
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

import { useCallback, useState } from 'react'
import axios from 'axios'
import { User } from 'src/types/user'

type UseUsersType = {
  isLoading: boolean
  getUsers: () => Promise<User[]>
  getUser: (userId: number) => Promise<User>
}

export const useUsers = (): UseUsersType => {
  const [isLoading, setisLoading] = useState(false)

  const getUsers = useCallback(async (): Promise<User[]> => {
    try {
      setisLoading(true)
      const res = await axios({
        method: 'get',
        url: 'http://localhost:3005/users',
      })

      return res.data as User[]
    } catch (err) {
      console.error(err)

      return []
    } finally {
      setisLoading(false)
    }
  }, [])

  const getUser = useCallback(async (userId: number): Promise<User> => {
    try {
      setisLoading(true)
      const res = await axios({
        method: 'get',
        url: `http://localhost:3005/users/${userId}`,
      })

      return res.data as User
    } catch (err) {
      console.error(err)

      return {} as User
    } finally {
      setisLoading(false)
    }
  }, [])

  return {
    isLoading,
    getUsers,
    getUser,
  }
}

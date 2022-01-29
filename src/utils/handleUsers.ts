import { User } from '../types/user'

export const fetchUsers = async (): Promise<User[]> => {
  try {
    const res = await fetch(`http://localhost:3005/users`)

    return (await res.json()) as User[]
  } catch (err) {
    console.error(err)

    return []
  }
}

export const fetchUser = async (id: string): Promise<User> => {
  try {
    const res = await fetch(`http://localhost:3005/users/${id}`)

    return (await res.json()) as User
  } catch (err) {
    console.log(`Error: ${err}`)
    return {} as User
  }
}

import { z } from 'zod'

export interface User {
  id: number
  nickname: string
  token: string
}
export interface CurrentUser extends User {
  isLogged: boolean
}
export const UserZObject = z
  .array(
    z.object({
      id: z.number(),
      nickname: z.string(),
      token: z.string(),
    })
  )
  .nonempty()

import { ConversationType } from './conversation'

export interface Correspondent {
  nickname: string
  id: number
}
export interface CorrespondentQuery extends ConversationType {
  userId: number
}

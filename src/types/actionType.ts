import { User } from './user'

export type ActionType = { type: 'ISKNOWN' | 'ISUNKNOWN'; payload?: User }

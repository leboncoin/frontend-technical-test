import { createContext, useReducer, FC, ReactNode, useState } from 'react'
import { User, CurrentUser } from '../types/user'
import { isKnownReducer } from './reducers/isKnownReducer'
import { ConversationType } from '../types/conversation'

type Props = {
  children: ReactNode
}

interface Context {
  userInfo: CurrentUser
  conversations: ConversationType[]
  setConversations: (conversations: ConversationType[]) => void
  handleIsKnown: (data: User) => void
  handleIsUnknown: () => void
}

export const ConversationContext = createContext({} as Context)

export const StoreProvider: FC<Props> = ({ children }) => {
  const [userInfo, dispatchIsKnownUser] = useReducer(
    isKnownReducer,
    {} as CurrentUser
  )
  const [conversations, setConversations] = useState<ConversationType[]>([])

  const [selectedConversation, setSelectedConversation] = useState({})

  const handleIsKnown = (data: User) => {
    dispatchIsKnownUser({ payload: data, type: 'ISKNOWN' })
  }
  const handleIsUnknown = () => {
    dispatchIsKnownUser({ type: 'ISUNKNOWN' })
  }

  const store = {
    userInfo,
    handleIsKnown,
    handleIsUnknown,
    conversations,
    setConversations,
    selectedConversation,
    setSelectedConversation,
  }

  return (
    <ConversationContext.Provider value={store}>
      {children}
    </ConversationContext.Provider>
  )
}

import { useEffect, useState, VFC } from 'react'
import { useRouter } from 'next/router'

import ConversationItem from '@Components/conversationItem/ConversationItem'
import { UseConversations } from '@Hooks/UseConversations'
import { Conversation } from '@Types/conversation'

const User: VFC = () => {
  const router = useRouter()
  const { userID } = router.query
  const { isLoading, getConversations } = UseConversations()

  const [conversations, setConversations] = useState<Conversation[]>([])

  useEffect(() => {
    async function fetchConversations() {
      setConversations(await getConversations(userID.toString()))
    }
    fetchConversations()
  }, [userID])

  return (
    <div>
      {!isLoading &&
        conversations.map((conversation) => <ConversationItem key={conversation.id} conversation={conversation} />)}
    </div>
  )
}

export default User

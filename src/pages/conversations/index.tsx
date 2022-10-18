import { useContext, FC, useEffect } from 'react'
import ConversationOverview from '../../components/ConversationOverview'
import { ConversationContext } from '../../store/store'
import { apiUrl } from '../_app'
import { ConversationType, ConversationsArray } from '../../types/conversation'
import CreateConversation from '../../components/CreateConversation'

const Conversations: FC = () => {
  const { userInfo, conversations, setConversations } =
    useContext(ConversationContext)

  useEffect(() => {
    const fetchConversations = async () => {
      const data = await fetch(`${apiUrl}/conversations/${userInfo.id}`)
      const res = await data.json()
      const parsedData = ConversationsArray.parse(res)
      setConversations(parsedData)
    }

    fetchConversations()
  }, [setConversations, userInfo.id])

  return (
    <>
      {conversations.length > 0
        ? conversations.map((c: ConversationType) => (
            <ConversationOverview key={`conv${c.id}`} {...c} />
          ))
        : null}
      <CreateConversation />
    </>
  )
}

export default Conversations

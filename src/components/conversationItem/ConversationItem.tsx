import { VFC } from 'react'

import CardUser from '@Components/carUser/CardUser'
import { Conversation } from '@Types/conversation'

type ConversationItemProps = { conversation: Conversation }

const ConversationItem: VFC<ConversationItemProps> = ({ conversation }) => {
  const { recipientNickname, id } = conversation

  return (
    <div>
      <CardUser name={recipientNickname} href={`/conversation/${id}`} />
    </div>
  )
}

export default ConversationItem

import { VFC } from 'react'

import CardUserItem from '@Components/carUser/CardUserItem'
import { Conversation } from '@Types/conversation'

type ConversationItemProps = { conversation: Conversation }

const ConversationItem: VFC<ConversationItemProps> = ({ conversation }) => {
  const { recipientNickname } = conversation

  return (
    <div>
      <CardUserItem name={recipientNickname} />
    </div>
  )
}

export default ConversationItem

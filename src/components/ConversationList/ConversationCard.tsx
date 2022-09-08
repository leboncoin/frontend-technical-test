import React, { FC } from 'react'
import { Conversation } from 'src/types/conversation'

interface ConversationCardProps {
    conversation: Conversation
}

const ConversationCard: FC<ConversationCardProps> = ({conversation}: ConversationCardProps) => {
  return (
    <div className='flex p-4'>ConversationCard</div>
  )
}

export default ConversationCard
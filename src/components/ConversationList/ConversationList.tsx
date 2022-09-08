import React from 'react'
import { Conversation } from 'src/types/conversation'
import ConversationCard from './ConversationCard'

interface ConversationListProps {
    list: Conversation[]
}

const ConversationList = ({list} : ConversationListProps) => {
  return (
    <div className='flex flex-col'>{
      list.map((conversation: Conversation, index: number)=> {
        return <ConversationCard key={index} conversation={conversation}/>
      })
    }</div>
  )
}

export default ConversationList
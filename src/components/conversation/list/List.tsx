import type { FC } from 'react'
import { Card } from '../card/Card'
import styles from './list.module.css'
import { useConversation } from '../../../hooks/useConversation'
interface ListProps {
  loggedUserId: number;
}

export const List : FC<ListProps> = ({ loggedUserId }) => {

  const {conversations} = useConversation(loggedUserId)

  return (
    <div className={styles.conversationsList}>
        <div className={styles.container}>
          {
            conversations.map((conversation,i)=>
                <Card key={`conversation-${i}`} conversation={conversation} loggedUserId={loggedUserId} />
              )
          }
        </div>
    </div>
  )
}
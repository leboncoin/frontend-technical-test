import { VFC } from 'react'

import CardUser from '@Components/carUser/CardUser'
import { Conversation } from '@Types/conversation'

import styles from './styles.module.css'

type ConversationItemProps = { conversation: Conversation }

const ConversationItem: VFC<ConversationItemProps> = ({ conversation }) => {
  const { recipientNickname, id } = conversation

  return (
    <li className={styles.list}>
      <CardUser name={recipientNickname} href={`/conversation/${id}`} />
    </li>
  )
}

export default ConversationItem

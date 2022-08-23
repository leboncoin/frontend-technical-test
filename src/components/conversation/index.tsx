import React from 'react'
import Link from 'next/link'
import { Conversation } from '../../types/conversation'
import styles from '../../styles/ConversationCard.module.css'

const ConversationCard = ({
    ...ConversationProps
}: Conversation) => {
    const {
        id,
        recipientId,
        recipientNickname,
        lastMessageTimestamp,
    } = ConversationProps
    const lastMessageDate = new Date(lastMessageTimestamp)
  return (
    <Link href={`/conversation/${id}/recipient/${recipientId}`}>
      <div className={styles.conversationCard}>
          <div className={styles.iconContainer}>
            <span className={styles.icon}>{recipientNickname[0].toUpperCase()}</span>
          </div>
          <div className={styles.details}>
            <div className={styles.nickname}>{recipientNickname}</div>
            <div className={styles.date}>{lastMessageDate.toLocaleString('fr-FR')}</div>
          </div>
      </div>
    </Link>
  )
}

export default ConversationCard

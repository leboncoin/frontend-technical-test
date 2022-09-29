import React from 'react'
import styles from '../../styles/MessageCard.module.css'

interface MessageCardProps {
  body: string,
  fromMe: boolean
}

const MessageCard = ({
    body,
    fromMe,
}: MessageCardProps) => {
  return (
    <div className={`${styles.messageCard} ${fromMe ? styles.fromMe : ''}`}>{body}</div>
  )
}

export default MessageCard

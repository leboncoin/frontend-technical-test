import { VFC } from 'react'
import { Button, Chip, Typography } from '@mui/material'

import { useMessages } from '@Hooks/UseMessages'
import { Message } from '@Types/message'

import styles from './styles.module.css'

type MessageBubbleProps = {
  message: Message
  loggedUserId: string
}

const MessageBubble: VFC<MessageBubbleProps> = ({ message, loggedUserId }) => {
  const { body, authorId, id, timestamp } = message

  const { deleteMessage } = useMessages()

  const handleDeleteMessage = (messageId: number) => {
    deleteMessage(messageId)
  }

  const date = new Date(timestamp * 1000)
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()
  const hours = date.getHours()
  const minutes = `0${date.getMinutes()}`
  const seconds = `0${date.getSeconds()}`
  const formattedTime = `${day}/${month}/${year} à ${hours}:${minutes.substr(-2)}:${seconds.substr(-2)}`

  const isUserAuthor = loggedUserId === authorId.toString()

  return (
    <li className={isUserAuthor ? styles.messageSend : styles.messageReceived}>
      <Button onClick={() => handleDeleteMessage(id)}>Supprimer</Button>
      <Typography>{formattedTime}</Typography>
      <Chip color={isUserAuthor ? 'primary' : 'secondary'} label={body} />
    </li>
  )
}

export default MessageBubble

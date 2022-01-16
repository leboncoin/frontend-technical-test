import { useEffect, useState, VFC } from 'react'
import { Chip, Typography } from '@mui/material'
import Head from 'next/head'
import { useRouter } from 'next/router'

import CustomAppBar from '@Components/customAppBar/CustomAppBar'
import { UseMessages } from '@Hooks/UseMessages'
import { Message } from '@Types/message'

import { loggedUserId } from '../_app'

import styles from './styles.module.css'

const ConversationPage: VFC = () => {
  const router = useRouter()
  const { cID } = router.query

  const [messages, setMessages] = useState<Message[]>([])

  const { isLoading, getMessages } = UseMessages()

  useEffect(() => {
    async function fetchMessages() {
      setMessages(await getMessages(cID.toString()))
    }
    fetchMessages()
  }, [cID])

  const messageBubbles = (message: Message) => {
    const { body, authorId, conversationId, id, timestamp } = message

    const date = new Date(timestamp * 1000)
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    const hours = date.getHours()
    const minutes = `0${date.getMinutes()}`
    const seconds = `0${date.getSeconds()}`
    const formattedTime = `${day}/${month}/${year} à ${hours}:${minutes.substr(-2)}:${seconds.substr(-2)}`

    const isUserAuthor = loggedUserId === authorId

    return (
      <li className={isUserAuthor ? styles.messageSend : styles.messageReceived}>
        <Typography>{formattedTime}</Typography>
        <Chip color={isUserAuthor ? 'primary' : 'secondary'} label={body} />
      </li>
    )
  }

  return (
    <>
      <Head>
        <title>Frontend Technical test - Leboncoin</title>
        <meta name="description" content="Frontend exercise for developpers who want to join us on leboncoin.fr" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      </Head>
      <CustomAppBar text="" isBackButton />

      {!isLoading && <ul className={styles.conversationList}>{messages.map((message) => messageBubbles(message))}</ul>}
    </>
  )
}

export default ConversationPage

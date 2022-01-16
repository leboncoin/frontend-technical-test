import { useEffect, useState, VFC } from 'react'
import { useForm } from 'react-hook-form'
import { Input } from '@mui/material'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { getLoggedUserId } from 'src/utils/getLoggedUserId'

import CustomAppBar from '@Components/customAppBar/CustomAppBar'
import MessageBubble from '@Components/messageBubble/MessageBubble'
import { NewMessage, useMessages } from '@Hooks/UseMessages'
import { Message } from '@Types/message'

import styles from './styles.module.css'

const ConversationPage: VFC = () => {
  const router = useRouter()
  const { cID } = router.query
  const [messages, setMessages] = useState<Message[]>([])
  const { isLoading, getMessages, addMessage } = useMessages()
  const { register, handleSubmit } = useForm()

  useEffect(() => {
    async function fetchMessages() {
      setMessages(await getMessages(cID.toString()))
    }
    fetchMessages()
  }, [cID])

  const onSubmit = async (data) => {
    const newMessage: NewMessage = {
      conversationId: parseInt(cID.toString(), 10),
      body: data.message,
      timestamp: +new Date(),
      authorId: getLoggedUserId(),
    }

    const addedMessage = await addMessage(newMessage)
    setMessages([...messages, addedMessage])
  }

  return (
    <>
      <Head>
        <title>Frontend Technical test - Leboncoin</title>
        <meta name="description" content="Frontend exercise for developpers who want to join us on leboncoin.fr" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      </Head>
      <CustomAppBar text="" isBackButton />

      {!isLoading && (
        <>
          <ul className={styles.conversationList}>
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
          </ul>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Input required id="message" {...register('message', { required: true })} />
            <input type="submit" />
          </form>
        </>
      )}
    </>
  )
}

export default ConversationPage

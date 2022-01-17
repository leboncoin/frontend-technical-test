import { useEffect, useState, VFC } from 'react'
import { useLocalStorage } from 'react-use'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { getLoggedUserId } from 'src/utils/getLoggedUserId'

import CustomAppBar from '@Components/customAppBar/CustomAppBar'
import MessageBubble from '@Components/messageBubble/MessageBubble'
import MessageInput from '@Components/messageInput/MessageInput'
import { NewMessage, useMessages } from '@Hooks/UseMessages'
import { useUsers } from '@Hooks/UseUsers'
import { LoggedUserId } from '@Types/loggedUserId'
import { Message } from '@Types/message'
import { User } from '@Types/user'

import styles from './styles.module.css'

const ConversationPage: VFC = () => {
  const router = useRouter()
  const { cID } = router.query
  const [messages, setMessages] = useState<Message[]>([])
  const [contact, setContact] = useState<User>()
  const { isLoading, getMessages, addMessage } = useMessages()
  const { getUser } = useUsers()

  useEffect(() => {
    async function fetchMessages() {
      setMessages(await getMessages(cID.toString()))
    }

    async function fetchContact() {
      setContact(await getUser(parseInt(cID.toString(), 10)))
    }

    fetchMessages()
    fetchContact()
  }, [cID])

  const onSubmit = async (data) => {
    const newMessage: NewMessage = {
      conversationId: parseInt(cID.toString(), 10),
      body: data.message,
      timestamp: Math.floor(Date.now() / 1000),
      authorId: getLoggedUserId(),
    }

    const addedMessage = await addMessage(newMessage)
    setMessages([...messages, addedMessage])
  }

  const [loggedUserId] = useLocalStorage<LoggedUserId>('user')

  return (
    <div className={styles.main}>
      <Head>
        <title>Frontend Technical test - Leboncoin</title>
        <meta name="description" content="Frontend exercise for developpers who want to join us on leboncoin.fr" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      </Head>

      <CustomAppBar title={contact && contact.nickname} isBackButton />

      {!isLoading && (
        <>
          <ul className={styles.conversationList}>
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} loggedUserId={loggedUserId} />
            ))}
          </ul>

          <MessageInput onSubmit={onSubmit} />
        </>
      )}
    </div>
  )
}

export default ConversationPage

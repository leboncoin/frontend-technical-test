import { useEffect, useState, VFC } from 'react'
import { useLocalStorage } from 'react-use'
import Head from 'next/head'
import { useRouter } from 'next/router'

import ConversationItem from '@Components/conversationItem/ConversationItem'
import CustomAppBar from '@Components/customAppBar/CustomAppBar'
import { useConversations } from '@Hooks/UseConversations'
import { Conversation } from '@Types/conversation'
import { LoggedUserId } from '@Types/loggedUserId'

import styles from './styles.module.css'

const UserPage: VFC = () => {
  const router = useRouter()
  const { uID } = router.query
  const { isLoading, getConversations } = useConversations()

  const [conversations, setConversations] = useState<Conversation[]>([])

  useEffect(() => {
    async function fetchConversations() {
      setConversations(await getConversations(uID.toString()))
    }
    fetchConversations()
  }, [uID])

  useLocalStorage<LoggedUserId>('user', uID.toString())

  return (
    <>
      <Head>
        <title>Frontend Technical test - Leboncoin</title>
        <meta name="description" content="Frontend exercise for developpers who want to join us on leboncoin.fr" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      </Head>
      <CustomAppBar title="Messages" isBackButton />
      {!isLoading && (
        <ul className={styles.main}>
          {conversations.map((conversation) => (
            <ConversationItem key={conversation.id} conversation={conversation} />
          ))}
        </ul>
      )}
    </>
  )
}

export default UserPage

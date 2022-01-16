import { useEffect, useState, VFC } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import ConversationItem from '@Components/conversationItem/ConversationItem'
import CustomAppBar from '@Components/customAppBar/CustomAppBar'
import { UseConversations } from '@Hooks/UseConversations'
import { Conversation } from '@Types/conversation'

const UserPage: VFC = () => {
  const router = useRouter()
  const { uID } = router.query
  const { isLoading, getConversations } = UseConversations()

  const [conversations, setConversations] = useState<Conversation[]>([])

  useEffect(() => {
    async function fetchConversations() {
      setConversations(await getConversations(uID.toString()))
    }
    fetchConversations()
  }, [uID])

  return (
    <>
      <Head>
        <title>Frontend Technical test - Leboncoin</title>
        <meta name="description" content="Frontend exercise for developpers who want to join us on leboncoin.fr" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      </Head>
      <CustomAppBar text="Messages" isBackButton />
      {!isLoading && (
        <>
          {conversations.map((conversation) => (
            <ConversationItem key={conversation.id} conversation={conversation} />
          ))}
        </>
      )}
    </>
  )
}

export default UserPage

import type { FC } from 'react'
import { useRouter } from 'next/router'
import { userId, baseUrl } from '../constants'
import useSWR from 'swr'
import ConversationButton from '../components/ConversationButton'
import toast from 'react-hot-toast'
import { useEffect, useState } from 'react'

import '../styles/Home.module.css'
import Drawer from '../components/Drawer'

const fetcher = (url) => fetch(url).then((res) => res.json())

const pageLoading = (conversationsError, conversationsData) => {
  if (!conversationsError && !conversationsData) return true
}

const postNewConversation = (newConversation, router) => {
  fetch(`${baseUrl}/conversations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      nickname: newConversation.nickname,
      body: newConversation.message,
    }),
  }).then((res) => {
    if (res.redirected) {
      router.push(
        res.url.replace(`${baseUrl}/`, window.location.href),
      )
    }
  })
}

const Home: FC = () => {
  const router = useRouter()
  const [newConversation, setNewConversation] = useState({
    nickname: '',
    message: '',
  })

  const { data: conversationsData, error: conversationsError } =
    useSWR(`${baseUrl}/conversations/${userId}`, fetcher)

  useEffect(() => {
    if (pageLoading(conversationsError, conversationsData)) {
      toast.loading('chargement de tes conversations...', {
        id: 'conversations',
      })
    }
  }, [conversationsError, conversationsData])

  useEffect(() => {
    if (newConversation.nickname)
      postNewConversation(newConversation, router)
  }, [newConversation, router])

  if (pageLoading(conversationsError, conversationsData)) {
    return <></>
  }

  if (conversationsError) return <></>

  const conversations = conversationsData.result.sort(
    (a, b) => b.latestMessageTimestamp - a.latestMessageTimestamp,
  )

  return (
    <>
      <Drawer onSend={setNewConversation}>
        <ul className="overflow-auto h-screen max-w-2xl container">
          <h2 className="ml-2 mb-2 text-gray-600 text-lg my-2">
            Chats
          </h2>
          {conversations.map((conversation) => {
            const friendId =
              conversation.recipientId !== userId
                ? conversation.recipientId
                : conversation.senderId
            return (
              <ConversationButton
                key={conversation.id}
                friendId={friendId}
                conversationId={conversation.id}
              ></ConversationButton>
            )
          })}
          <li></li>
        </ul>
      </Drawer>
    </>
  )
}

export default Home

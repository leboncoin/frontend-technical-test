import type { FC } from 'react'
import { useRouter } from 'next/router'
import { userId, baseUrl } from '../constants'
import useSWR, { SWRConfig } from 'swr'
import ConversationButton from '../components/ConversationButton'
import toast from 'react-hot-toast'
import { useToasterStore } from 'react-hot-toast'
import { useEffect } from 'react'

import '../styles/Home.module.css'

const fetcher = (url) => fetch(url).then((res) => res.json())

const pageLoading = (conversationsError, conversationsData) => {
  if (!conversationsError && !conversationsData) return true
}

const Home: FC = () => {
  const router = useRouter()
  const { data: conversationsData, error: conversationsError } =
    useSWR(`${baseUrl}/conversations/${userId}`, fetcher)

  useEffect(() => {
    if (pageLoading(conversationsError, conversationsData)) {
      toast.loading('chargement de tes conversations...', {
        id: 'conversations',
      })
    }
  }, [conversationsError, conversationsData])

  if (pageLoading(conversationsError, conversationsData)) {
    return <></>
  }

  if (conversationsError) return <></>

  const conversations = conversationsData.result.sort(
    (a, b) => b.latestMessageTimestamp - a.latestMessageTimestamp,
  )

  return (
    <>
      <ul className="overflow-auto h-screen">
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
      </ul>
    </>
  )
}

export default Home

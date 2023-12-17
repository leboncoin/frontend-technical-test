import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import Link from 'next/link'

import Layout from '@/layouts/base'
import MessageRow from '@/components/message-row'
import MessageForm from '@/components/message-form'

import { getMessages, getConversations } from '@/api/index'
import { Conversation } from '@/types/conversation'
import { getLoggedUserId } from '@/utils/getLoggedUserId'
import { formatLastMessageDateAndTime } from '@/utils/formatters'

export default function Conversation({
  conversation,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const userId = getLoggedUserId()

  const { data: messages, isLoading } = useQuery({
    queryKey: ['conversation', userId, conversation.id],
    queryFn: () => getMessages(conversation.id),
  })

  if (isLoading) {
    return (
      <Layout>
        <h3>Loading...</h3>
      </Layout>
    )
  }

  const lastMessageTimestamp = messages[messages.length - 1]?.timestamp
  const lastMessageTimeData = formatLastMessageDateAndTime(lastMessageTimestamp)

  const notLoggedUserParticipantName =
    conversation.recipientId === userId
      ? conversation.senderNickname
      : conversation.recipientNickname

  return (
    <Layout className="flex items-stretch">
      <div className="flex w-full flex-col gap-4">
        <Link
          href="/conversations"
          className="self-start border-b-4 border-b-transparent px-2 py-1 text-sm transition hover:border-b-orange-600"
        >
          &larr; Conversations
        </Link>

        <div className="flex justify-between bg-grey-300 px-2 py-4">
          <span>{notLoggedUserParticipantName} - You</span>
          {lastMessageTimeData && (
            <span>
              Last message {lastMessageTimeData.date} at{' '}
              {lastMessageTimeData.time}
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col justify-end gap-2">
          {messages.map((message) => (
            <MessageRow
              key={message.id}
              messageBody={message.body}
              isLoggedUser={userId === message.authorId}
              senderName={
                userId === message.authorId
                  ? undefined
                  : notLoggedUserParticipantName
              }
            />
          ))}
        </div>

        <MessageForm authorId={userId} conversationId={conversation.id} />
      </div>
    </Layout>
  )
}

export async function getServerSideProps({
  params: { id },
}: GetServerSidePropsContext<{ id: string }>) {
  const userId = getLoggedUserId()

  const parsedId = Number(id)

  const queryClient = new QueryClient()

  const [conversations] = await Promise.all([
    getConversations(userId),
    queryClient.prefetchQuery({
      queryKey: ['conversation', userId, id],
      queryFn: () => getMessages(parsedId),
    }),
  ])

  const conversation = conversations.find((conv) => conv.id === parsedId)

  if (!conversation) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      conversation,
    },
  }
}

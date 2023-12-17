import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query'

import Layout from '@/layouts/base'
import Card from '@/components/conversation-card'

import { getConversations } from '@/api/index'
import { getLoggedUserId } from '@/utils/getLoggedUserId'

export default function Conversations() {
  const userId = getLoggedUserId()

  const { data: conversations, isLoading } = useQuery({
    queryKey: ['conversations', userId],
    queryFn: () => getConversations(userId),
  })

  if (isLoading) {
    return (
      <Layout>
        <h3>Loading...</h3>
      </Layout>
    )
  }

  if (!conversations.length) {
    return (
      <Layout>
        <h3>No messages yet...</h3>
      </Layout>
    )
  }

  return (
    <Layout>
      <ul className="flex flex-col gap-4">
        {conversations.map((conversation) => (
          <li key={conversation.id}>
            <Card
              id={conversation.id}
              userId={
                userId === conversation.senderId
                  ? conversation.recipientId
                  : conversation.senderId
              }
              name={
                userId === conversation.senderId
                  ? conversation.recipientNickname
                  : conversation.senderNickname
              }
              lastMessageTimestamp={conversation.lastMessageTimestamp}
            />
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export async function getServerSideProps() {
  const userId = getLoggedUserId()

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['conversations', userId],
    queryFn: () => getConversations(userId),
  })

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

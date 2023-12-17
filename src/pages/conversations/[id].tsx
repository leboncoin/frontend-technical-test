import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import Link from 'next/link'
import Image from 'next/image'

import Layout from '@/layouts/base'
import MessageRow from '@/components/message-row'

import { getConversation } from '@/api/index'
import { Message } from '@/types/message'
import { getLoggedUserId } from '@/utils/getLoggedUserId'
import sentIcon from '@/assets/sent.svg'

export default function Conversation({
  conversationId,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const userId = getLoggedUserId()

  const { data: messages, isLoading } = useQuery<Message[]>({
    queryKey: ['conversation', userId, conversationId],
    queryFn: () => getConversation(conversationId),
  })

  if (isLoading) {
    return (
      <Layout>
        <h3>Loading...</h3>
      </Layout>
    )
  }

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
          <span>Jane Doe - You</span>
          <span>Last message today at 2:45</span>
        </div>

        <div className="flex flex-1 flex-col justify-end gap-2">
          {messages.map((message) => (
            <MessageRow
              key={message.id}
              messageBody={message.body}
              isLoggedUser={userId === message.authorId}
            />
          ))}
        </div>

        <form className="mt-4 flex items-center gap-4 rounded-2xl border border-grey-300 px-4 py-2 focus-within:border-grey-500">
          <textarea
            rows={3}
            className="flex-1 rounded-2xl px-4 outline-none"
            placeholder="Send message"
          />
          <button className="flex h-14 w-14 items-center justify-center rounded-2xl bg-grey-300 transition hover:bg-orange-600 disabled:opacity-70 disabled:hover:bg-grey-300">
            <Image src={sentIcon} height={24} width={24} alt="send message" />
          </button>
        </form>
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

  await queryClient.prefetchQuery({
    queryKey: ['conversation', userId, id],
    queryFn: () => getConversation(parsedId),
  })

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      conversationId: parsedId,
    },
  }
}

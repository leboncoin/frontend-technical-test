import { useContext, FC, useEffect, useState } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import { formatRelative, subDays } from 'date-fns'
import { ConversationContext } from '../../store/store'
import { apiUrl } from '../_app'
import Message from '../../components/Message'
import { determineCorrespondent } from '../../utils/determineCorrespondent'
import {
  ConversationsArray,
  ExtendedConversation,
} from '../../types/conversation'
import { Message as MessageType, MessagesArray } from '../../types/message'

const fetchMessages = async (
  id: number,
  setFunction: (param: MessageType[]) => void
) => {
  const data = await fetch(`${apiUrl}/messages/${id}`)
  const res = await data.json()
  const parsedData = MessagesArray.parse(res)
  setFunction(parsedData)
}

const Conversation = ({
  conversationId,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter()
  const { userInfo, conversations } = useContext(ConversationContext)

  const [selectedConversation, setSelectedConversation] =
    useState<ExtendedConversation>({} as ExtendedConversation)
  const [messages, setMessages] = useState<MessageType[]>([])

  useEffect(() => {
    fetchMessages(conversationId, setMessages)

    // Get conversation data when visitor come from direct link
    if (conversations.length !== 0) {
      const selectedConvIndex = conversations.findIndex(
        (c) => c.id === Number(conversationId)
      )
      setSelectedConversation({
        correspondent: determineCorrespondent({
          userId: userInfo.id,
          ...conversations[selectedConvIndex],
        }),
        ...conversations[selectedConvIndex],
      })
    } else {
      const fetchAndSelectConversations = async () => {
        const data = await fetch(`${apiUrl}/conversations/${userInfo.id}`)
        const res = await data.json()
        const parsedData = await ConversationsArray.parse(res)
        const selectedConvIndex = parsedData.findIndex(
          (c) => c.id === Number(conversationId)
        )
        const selectedConv = parsedData[selectedConvIndex]
        setSelectedConversation({
          correspondent: determineCorrespondent({
            userId: userInfo.id,
            ...selectedConv,
          }),
          ...selectedConv,
        })
      }
      fetchAndSelectConversations()
    }
  }, [conversationId, conversations, userInfo.id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = {
      body: e.target.msg.value,
      authorId: userInfo.id,
      timestamp: Date.now(),
      conversationId: Number(conversationId),
    }

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
    const req = await fetch(`${apiUrl}/messages/${conversationId}`, options)
    const res = await req.json()
    if (req.ok)
      setMessages((previous) => {
        return [...previous, res]
      })
  }
  return (
    <>
      {Object.keys(selectedConversation).length !== 0 ? (
        <div className="flex bg-slate-300 space-x-5 p-4 justify-between">
          <button onClick={() => router.back()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 hover:stroke-lbc"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
              />
            </svg>
          </button>
          <span>{selectedConversation.correspondent.nickname} - You</span>
          <span>
            {messages.length > 0 &&
              formatRelative(
                messages[messages.length - 1].timestamp,
                new Date()
              )}
          </span>
        </div>
      ) : null}
      <div className="flex flex-col justify-end h-full">
        {messages.length !== 0
          ? messages.map((m) => (
              <Message key={m.id} owned={userInfo.id === m.authorId} {...m} />
            ))
          : null}
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex px-5 border rounded-full border-1 h-12 space-x-3"
      >
        <input id="msg" type="text" className="grow"></input>
        <button type="submit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 hover:stroke-lbc"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
            />
          </svg>
        </button>
      </form>
    </>
  )
}

export default Conversation

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  // @ts-ignore
  const { conversation } = params
  return { props: { conversationId: conversation } }
}

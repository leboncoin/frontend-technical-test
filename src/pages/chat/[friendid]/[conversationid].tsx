import MessageSender from '../../../components/MessageSender/MessageSender'
import { Message } from '../../../components/Message'
import { userId, baseUrl } from '../../../constants'
import useSWR, { SWRConfig } from 'swr'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import anonymousPicture from '../../../../public/anonymous.jpg'

const fetcher = (url) => fetch(url).then((res) => res.json())

const pageHasError = (messageError, friendError) => {
  if (messageError || friendError) return true
}

const pageHasData = (messages, friendData) => {
  if (messages && friendData) return true
}

const pageLoading = (
  messageError,
  friendError,
  messages,
  friendData,
) => {
  return (
    !pageHasError(messageError, friendError) &&
    !pageHasData(messages, friendData)
  )
}

const postMessage = (message: string, conversationId) => {
  return fetch(`${baseUrl}/messages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      body: message,
      conversationId: Number(conversationId),
      authorId: userId,
    }),
  })
}

const Chat = () => {
  const router = useRouter()
  const { conversationid, friendid } = router.query

  const messageSenderRef = useRef<any>()

  const [newMessage, setNewMessage] = useState(null)

  const { data: messages, error: messageError } = useSWR(
    `${baseUrl}/messages/${conversationid}`,
    fetcher,
  )
  const { data: friendData, error: friendError } = useSWR(
    `${baseUrl}/users/${friendid}`,
    fetcher,
  )

  useEffect(() => {
    if (
      pageLoading(messageError, friendError, messages, friendData)
    ) {
      toast.loading('chargement de tes messages...', {
        id: 'messages',
      })
    }
  }, [messageError, friendError, messages, friendData])

  useEffect(() => {
    if (newMessage && conversationid) {
      postMessage(newMessage, conversationid).then(() => {
        messageSenderRef.current.reset()
      })
    }
  }, [newMessage, conversationid])

  if (pageLoading(messageError, friendError, messages, friendData)) {
    return <></>
  }

  if (messageError || friendError) return <></>

  return (
    <div className=" h-screen flex flex-col  max-w-2xl container">
      <div className="flex items-center border-b border-gray-300 pl-3 py-3">
        <Image
          className="h-10 w-10 rounded-full object-cover"
          src={friendData.avatar || anonymousPicture}
          width="60"
          height="60"
          alt="username"
        ></Image>
        <span className="block ml-2 font-bold text-base text-gray-600">
          {friendData.nickname}
        </span>
      </div>
      <div className="chatbar w-full overflow-y-auto p-10 relative">
        <ul>
          <li className="clearfix2">
            {messages.map((message) => {
              const isUser = message.authorId === userId
              return (
                <div
                  key={message.id}
                  className={`w-full flex ${
                    isUser ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <Message
                    body={message.body}
                    isUser={isUser}
                    timestamp={message.timestamp}
                  ></Message>
                </div>
              )
            })}
          </li>
        </ul>
      </div>
      <MessageSender
        ref={messageSenderRef}
        onSend={setNewMessage}
      ></MessageSender>
    </div>
  )
}

export default Chat

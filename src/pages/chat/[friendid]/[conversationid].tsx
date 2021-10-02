import { NextPage } from 'next'
import { Message } from '../../../components/Message'
import { userId, baseUrl } from '../../../constants'
import useSWR, { SWRConfig } from 'swr'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import { useEffect } from 'react'

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

const Chat = () => {
  const router = useRouter()
  const { conversationid, friendid } = router.query

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
        duration: 2000,
        id: 'messages',
      })
    }
  }, [messageError, friendError, messages, friendData])

  if (pageLoading(messageError, friendError, messages, friendData)) {
    return <></>
  }

  if (messageError || friendError) return <></>

  return (
    <div className=" h-screen flex flex-col">
      <div className="flex items-center border-b border-gray-300 pl-3 py-3">
        <img
          className="h-10 w-10 rounded-full object-cover"
          src={friendData.avatar}
          alt="username"
        />
        <span className="block ml-2 font-bold text-base text-gray-600">
          {friendData.nickname}
        </span>
      </div>
      <div
        id="chat"
        className="chatbar w-full overflow-y-auto p-10 relative"
      >
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

      <div className="w-full mt-auto py-3 px-3 flex  border-t border-gray-300">
        <input
          aria-placeholder="Escribe un mensaje aquí"
          placeholder="Escribe un mensaje aquí"
          className="py-2 mx-3 pl-5 block w-full rounded-full bg-gray-100 outline-none focus:text-gray-700"
          type="text"
          name="message"
          required
        />

        <button
          className="outline-none focus:outline-none"
          type="submit"
        >
          <svg
            className="text-gray-400 h-7 w-7 origin-center transform rotate-90"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default Chat

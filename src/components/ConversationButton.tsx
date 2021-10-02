import type { FC } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import useSWR, { SWRConfig } from 'swr'
import { userId, baseUrl } from '../constants'
import { differenceInHours, differenceInMinutes } from 'date-fns'
import { differenceInDays } from 'date-fns'

type ConversationButtonProps = {
  conversationId: number
  friendId: number
}
const fetcher = (url) => fetch(url).then((res) => res.json())

const ConversationButton: FC<ConversationButtonProps> = ({
  conversationId,
  friendId,
}) => {
  const router = useRouter()
  const { data: messageData, error: messageError } = useSWR(
    `${baseUrl}/message/latest/${conversationId}`,
    fetcher,
  )
  const { data: friendData, error: friendError } = useSWR(
    `${baseUrl}/users/${friendId}`,
    fetcher,
  )

  if (!messageData || !messageData.result || !friendData) return <></>

  if (messageError || friendError)
    return <div>cette conversation ne peut pas s'afficher</div>

  const message = messageData.result

  return (
    <li>
      <Link href={`/chat/${friendId}/${conversationId}`}>
        <a className="hover:bg-gray-100 border-b border-gray-300 px-3 py-2 cursor-pointer flex items-center text-sm focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src={friendData.avatar}
            alt="username"
          />
          <div className="w-full pb-2">
            <div className="flex justify-between">
              <span className="block ml-2 font-semibold text-base text-gray-600 ">
                {friendData.nickname}
              </span>
              <span className="block ml-2 text-sm text-gray-600">
                {differenceInMinutes(
                  new Date(),
                  new Date(message.timestamp),
                )}{' '}
                min
              </span>
            </div>
            <span className="block ml-2 text-sm text-gray-600">
              {message.body}
            </span>
          </div>
        </a>
      </Link>
    </li>
  )
}
export default ConversationButton

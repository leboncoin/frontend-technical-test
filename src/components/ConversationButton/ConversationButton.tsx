import type { FC } from 'react'
import Link from 'next/link'
import useSWR from 'swr'
import { baseUrl } from '../../constants'
import { differenceInMinutes } from 'date-fns'
import Image from 'next/image'
import anonymousPicture from '../../../public/anonymous.jpg'
import { Message } from '../../types/message'
import { User as Friend } from '../../types/user'

type ConversationButtonProps = {
  conversationId: number
  friendId: number
}
const fetcher = (url) => fetch(url).then((res) => res.json())

const ConversationButton: FC<ConversationButtonProps> = ({
  conversationId,
  friendId,
}) => {
  const {
    isValidating: isValidatingMessage,
    data: messageData,
    error: messageError,
  } = useSWR<{
    result: Message
  }>(`${baseUrl}/message/latest/${conversationId}`, fetcher)
  const {
    isValidating: isValidatingFriend,
    data: friendData,
    error: friendError,
  } = useSWR<Friend>(`${baseUrl}/users/${friendId}`, fetcher)

  if (!messageData || !messageData.result || !friendData) return <></>

  if (messageError || friendError)
    return <div>cette conversation ne peut pas s'afficher</div>

  const message = messageData.result

  return (
    <>
      <>
        {isValidatingFriend || isValidatingMessage ? (
          <div data-testid="loading"></div>
        ) : null}
      </>
      <li>
        <Link
          data-testid="conversation-link"
          href={`/chat/${friendId}/${conversationId}`}
        >
          <a className="hover:bg-gray-100 border-b border-gray-300 px-3 py-2 cursor-pointer flex items-center text-sm focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out">
            <Image
              className="h-10 w-10 rounded-full object-cover"
              src={friendData.avatar || anonymousPicture}
              width="60"
              height="60"
              alt="username"
            ></Image>
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
    </>
  )
}
export default ConversationButton

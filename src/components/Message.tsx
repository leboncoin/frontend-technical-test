import type { FC } from 'react'

export type MessageProps = {
  timestamp: number
  body: string
  isUser: boolean
}

export const Message: FC<MessageProps> = ({
  timestamp,
  body,
  isUser,
}) => {
  return (
    <div
      className={`rounded px-5 py-2 my-2 text-gray-700 relative ${
        isUser ? 'bg-blue-100' : 'bg-gray-100'
      }`}
    >
      <span className="block">{body}</span>
      <span className="block text-xs text-right">
        {new Date(timestamp).toUTCString()}
      </span>
    </div>
  )
}

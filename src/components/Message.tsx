import type { FC } from 'react'

export type MessageProps = {
  timestamp: number
  body: string
  authorId: number
}

export const Message: FC<MessageProps> = ({ timestamp, body }) => {
  return (
    <div className="message bg-gray-100 rounded px-5 py-2 my-2 text-gray-700 relative">
      <span className="block">{body}</span>
      <span className="block text-xs text-right">{timestamp}</span>
    </div>
  )
}

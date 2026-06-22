import { memo } from 'react'
import type { MessageBubbleProps } from '@/types'

const MessageBubbleComponent = ({ message, isOwn, authorName }: MessageBubbleProps) => {
  return (
    <li
      className={[
        'mb-3 flex max-w-[75%] flex-col',
        isOwn ? 'items-end self-end' : 'items-start self-start',
      ].join(' ')}
      style={{ contentVisibility: 'auto' }}
    >
      {!isOwn && authorName && (
        <span className="mb-1 pl-1 text-xs text-neutral-500">{authorName}</span>
      )}
      <div
        className={[
          'break-words whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-[0.95rem] leading-snug',
          isOwn ? 'bg-primary text-white' : 'bg-neutral-100 text-neutral-900',
        ].join(' ')}
      >
        {message.body}
      </div>
    </li>
  )
}

export const MessageBubble = memo(MessageBubbleComponent)

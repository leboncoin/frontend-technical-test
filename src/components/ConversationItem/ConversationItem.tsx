import { memo } from 'react'
import { Avatar } from '../Avatar'
import { formatConversationDate } from '@/lib/display'
import type { ConversationItemProps } from '@/types'

const ConversationItemComponent = ({
  conversation,
  contactNickname,
  contactId,
  isSelected,
  onSelect,
}: ConversationItemProps) => {
  return (
    <li role="option" aria-selected={isSelected}>
      <button
        type="button"
        className={[
          'flex w-full cursor-pointer items-center gap-3.5 rounded-xl border bg-white px-4 py-3.5 text-left transition-[border-color,box-shadow] hover:border-neutral-300 hover:shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
          isSelected ? 'border-primary shadow-[0_0_0_1px_#1a73e8]' : 'border-neutral-200',
        ].join(' ')}
        onClick={() => onSelect(conversation.id)}
      >
        <Avatar nickname={contactNickname} id={contactId} />
        <div className="flex min-w-0 flex-col gap-0.5">
          <span className="truncate text-[0.95rem] font-bold text-neutral-900">
            {contactNickname}
          </span>
          <span className="text-[0.85rem] text-neutral-500">
            {formatConversationDate(conversation.lastMessageTimestamp)}
          </span>
        </div>
      </button>
    </li>
  )
}

export const ConversationItem = memo(ConversationItemComponent)

import { formatLastMessageLabel } from '@/lib/display'
import type { ConversationHeaderProps } from '@/types'

export const ConversationHeader = ({
  contactName,
  lastMessageTimestamp,
  onBack,
}: ConversationHeaderProps) => {
  return (
    <header className="flex shrink-0 items-center gap-2 border-b border-neutral-300 bg-neutral-100 px-4 py-3.5">
      {onBack && (
        <button
          type="button"
          className="hidden cursor-pointer border-none bg-transparent p-1 text-xl leading-none text-neutral-900 max-lg:block focus-visible:rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          onClick={onBack}
          aria-label="Back to list"
        >
          ←
        </button>
      )}
      <div className="flex min-w-0 flex-1 items-center justify-between gap-4">
        <span className="text-sm font-bold max-md:text-[0.85rem]">{contactName} - You</span>
        {lastMessageTimestamp !== null && (
          <span className="hidden truncate text-right text-sm font-bold text-neutral-900 lg:block">
            {formatLastMessageLabel(lastMessageTimestamp)}
          </span>
        )}
      </div>
    </header>
  )
}

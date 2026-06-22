import { ConversationItem } from '../ConversationItem'
import { ErrorSnackbar } from '../ErrorSnackbar'
import type { ConversationListParams } from '@/types'
import { useConversationList } from './useConversationList'

export const ConversationList = ({
  loggedUserId,
  selectedId,
  onSelect,
  onNewConversation,
}: ConversationListParams) => {
  const {
    items,
    isLoading,
    error,
    onRetry,
    onNewConversation: openModal,
  } = useConversationList({ loggedUserId, selectedId, onSelect, onNewConversation })

  return (
    <section className="flex h-full min-h-0 flex-col bg-white" aria-label="Conversation list">
      <div className="flex items-center justify-between gap-3 px-4 pb-2 pt-4">
        <h2 className="m-0 text-lg font-bold">Conversations</h2>
        <button
          type="button"
          className="cursor-pointer whitespace-nowrap rounded-full border border-primary bg-white px-3.5 py-2 text-[0.8rem] text-primary hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          onClick={openModal}
        >
          New conversation
        </button>
      </div>

      {error && (
        <ErrorSnackbar
          message={error instanceof Error ? error.message : 'Something went wrong.'}
          onRetry={onRetry}
        />
      )}

      {isLoading && !items.length && (
        <p className="m-0 p-4 text-center text-neutral-500" role="status">
          Loading…
        </p>
      )}

      {!isLoading && !items.length && !error && (
        <p className="m-0 p-4 text-center text-neutral-500">No conversations yet.</p>
      )}

      <ul
        className="m-0 flex flex-1 list-none flex-col gap-2.5 overflow-y-auto px-4 pb-4 pt-2"
        role="listbox"
        aria-label="Conversations"
      >
        {items.map(({ conversation, contactNickname, contactId, isSelected }) => (
          <ConversationItem
            key={conversation.id}
            conversation={conversation}
            contactNickname={contactNickname}
            contactId={contactId}
            isSelected={isSelected}
            onSelect={onSelect}
          />
        ))}
      </ul>
    </section>
  )
}

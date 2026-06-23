import { ConversationHeader } from './ConversationHeader'
import { ErrorSnackbar } from '../ErrorSnackbar'
import { MessageBubble } from './MessageBubble'
import { MessageInput } from '../MessageInput'
import type { MessageThreadProps } from '@/types'
import { useMessageThread } from './useMessageThread'

export const MessageThread = ({
  conversation,
  loggedUserId,
  contactName,
  authorName,
  onBack,
}: MessageThreadProps) => {
  const {
    sortedMessages,
    lastTimestamp,
    hasAccess,
    error,
    isLoading,
    bottomRef,
    handleSend,
    onRetry,
    isInputDisabled,
  } = useMessageThread({ conversation, loggedUserId })

  if (!hasAccess) {
    return (
      <section className="flex h-full min-h-0 flex-col bg-white">
        <p className="m-0 p-8 text-center text-danger" role="alert">
          You don&apos;t have access to this conversation.
        </p>
      </section>
    )
  }

  return (
    <section
      className="flex h-full min-h-0 flex-col bg-white"
      aria-label={`Conversation with ${contactName}`}
    >
      <ConversationHeader
        contactName={contactName}
        lastMessageTimestamp={lastTimestamp}
        onBack={onBack}
      />

      {error && (
        <ErrorSnackbar
          message={error instanceof Error ? error.message : 'Something went wrong.'}
          onRetry={onRetry}
        />
      )}

      <ul
        className="m-0 flex flex-1 list-none flex-col overflow-y-auto p-4"
        role="log"
        aria-live="polite"
        aria-relevant="additions"
      >
        {isLoading && !sortedMessages.length && (
          <li className="px-4 py-8 text-center text-sm text-neutral-500">Loading messages…</li>
        )}
        {!isLoading && !sortedMessages.length && !error && (
          <li className="px-4 py-8 text-center text-sm text-neutral-500">
            No messages yet. Start the conversation!
          </li>
        )}
        {sortedMessages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            isOwn={message.authorId === loggedUserId}
            authorName={message.authorId === loggedUserId ? undefined : authorName}
          />
        ))}
        <div ref={bottomRef} />
      </ul>

      <MessageInput
        conversationId={conversation.id}
        onSend={handleSend}
        disabled={isInputDisabled}
      />
    </section>
  )
}

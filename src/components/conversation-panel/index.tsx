import { forwardRef } from 'react'
import type { Conversation } from '@/types/conversation'
import type { ConversationMessages } from '@hooks/useConversationMessages'
import { getCounterpart } from '@utils/conversation'
import { formatLastMessageDate } from '@utils/datetime'
import Avatar from '@components/avatar'
import MessageList from '@components/message-list'
import MessageComposer from '@components/message-composer'
import { ArrowLeftIcon } from '@components/icons'
import styles from './conversation-panel.module.css'

interface ConversationPanelProps {
  conversation: Conversation
  state: ConversationMessages | undefined
  currentUserId: number
  onRetryMessages: (conversationId: number) => void
  onSend: (conversationId: number, text: string) => Promise<boolean>
  onBack: () => void
}

/**
 * Right-hand pane: header (back on mobile, counterpart identity, last
 * activity), the message log, and the composer.
 *
 * The parent renders one panel per selected conversation keyed by id, so
 * composer drafts never leak between conversations.
 */
const ConversationPanel = forwardRef<HTMLElement, ConversationPanelProps>(
  function ConversationPanel(
    { conversation, state, currentUserId, onRetryMessages, onSend, onBack },
    ref
  ) {
    const counterpart = getCounterpart(conversation, currentUserId)

    return (
      <section
        ref={ref}
        className={styles.panel}
        aria-label={`Conversation with ${counterpart.nickname}`}
        tabIndex={-1}
      >
        <header className={styles.header}>
          <button
            type="button"
            className={styles.backButton}
            onClick={onBack}
            aria-label="Back to conversations"
          >
            <ArrowLeftIcon />
          </button>
          <Avatar name={counterpart.nickname} />
          <div className={styles.identity}>
            <h2 className={styles.name}>{counterpart.nickname}</h2>
            <p className={styles.subtitle}>
              {conversation.lastMessageTimestamp > 0
                ? `Last message ${formatLastMessageDate(conversation.lastMessageTimestamp)}`
                : 'No messages yet'}
            </p>
          </div>
        </header>

        <MessageList
          messages={state?.messages ?? []}
          status={state?.status ?? 'idle'}
          error={state?.error ?? null}
          counterpartNickname={counterpart.nickname}
          currentUserId={currentUserId}
          onRetry={() => onRetryMessages(conversation.id)}
        />

        <MessageComposer
          onSend={(text) => onSend(conversation.id, text)}
          counterpartNickname={counterpart.nickname}
        />
      </section>
    )
  }
)

export default ConversationPanel

import { forwardRef } from 'react'
import type { Conversation } from '@/types/conversation'
import type { LoadStatus } from '@/types/loading'
import {
  NEW_CONVERSATION_BUTTON_ID,
  conversationButtonId,
} from '@constants/layout'
import { getCounterpart } from '@utils/conversation'
import { formatConversationListDate } from '@utils/datetime'
import Avatar from '@components/avatar'
import { PlusIcon } from '@components/icons'
import styles from './conversation-list.module.css'

interface ConversationListProps {
  conversations: Conversation[]
  status: LoadStatus
  error: string | null
  selectedConversationId: number | null
  currentUserId: number
  onSelect: (conversationId: number) => void
  onRetry: () => void
  onCreate: () => void
}

/**
 * Inbox list. Items are real buttons inside a semantic list; the selected
 * conversation is marked with `aria-current` AND a visual indicator so the
 * state never relies on color alone.
 */
const ConversationList = forwardRef<HTMLElement, ConversationListProps>(
  function ConversationList(
    {
      conversations,
      status,
      error,
      selectedConversationId,
      currentUserId,
      onSelect,
      onRetry,
      onCreate,
    },
    ref
  ) {
    return (
      <section
        ref={ref}
        className={styles.section}
        aria-label="Conversations"
        tabIndex={-1}
      >
        <header className={styles.header}>
          <h2 className={styles.title}>Messages</h2>
          <button
            type="button"
            id={NEW_CONVERSATION_BUTTON_ID}
            className={styles.newButton}
            onClick={onCreate}
          >
            <PlusIcon />
            New
          </button>
        </header>

        {error !== null ? (
          <div className={styles.alert} role="alert">
            <p className={styles.alertText}>{error}</p>
            <button type="button" className={styles.retryButton} onClick={onRetry}>
              Retry
            </button>
          </div>
        ) : status === 'loading' ? (
          <div>
            <p className="sr-only" aria-busy="true">
              Loading conversations
            </p>
            <ul className={styles.skeletonList} aria-hidden="true">
              {[0, 1, 2, 3].map((index) => (
                <li key={index} className={styles.skeletonItem}>
                  <span className={styles.skeletonAvatar} />
                  <span className={styles.skeletonLines}>
                    <span className={styles.skeletonLine} />
                    <span className={`${styles.skeletonLine} ${styles.skeletonShort}`} />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ) : conversations.length === 0 ? (
          <p className={styles.empty}>No conversations yet.</p>
        ) : (
          <ul className={styles.list}>
            {conversations.map((conversation) => {
              const counterpart = getCounterpart(conversation, currentUserId)
              const isSelected = conversation.id === selectedConversationId
              return (
                <li key={conversation.id}>
                  <button
                    type="button"
                    id={conversationButtonId(conversation.id)}
                    className={
                      isSelected
                        ? `${styles.item} ${styles.itemSelected}`
                        : styles.item
                    }
                    aria-current={isSelected ? 'true' : undefined}
                    onClick={() => onSelect(conversation.id)}
                  >
                    <Avatar name={counterpart.nickname} />
                    <span className={styles.itemBody}>
                      <span className={styles.itemName}>
                        {counterpart.nickname}
                      </span>
                      <span className={styles.itemMeta}>
                        {conversation.lastMessageTimestamp > 0
                          ? formatConversationListDate(
                              conversation.lastMessageTimestamp
                            )
                          : 'No messages yet'}
                      </span>
                    </span>
                    {isSelected && (
                      <span className={styles.selectedIndicator} aria-hidden="true" />
                    )}
                  </button>
                </li>
              )
            })}
          </ul>
        )}
      </section>
    )
  }
)

export default ConversationList

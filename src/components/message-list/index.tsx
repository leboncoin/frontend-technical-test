import { useEffect, useRef } from 'react'
import type { Message } from '@/types/message'
import type { LoadStatus } from '@/types/loading'
import { isOwnMessage } from '@utils/conversation'
import { formatMessageTime } from '@utils/datetime'
import styles from './message-list.module.css'

interface MessageListProps {
  messages: Message[]
  status: LoadStatus
  error: string | null
  counterpartNickname: string
  currentUserId: number
  onRetry: () => void
}

/**
 * Chronological message log for one conversation.
 *
 * - `role="log"` announces incoming messages to assistive technology.
 * - Message bodies are rendered as plain text only (React escapes them;
 *   dangerouslySetInnerHTML is never used).
 * - Loading and error states are scoped to this region: the rest of the app
 *   (list, composer, header) stays interactive.
 */
export default function MessageList({
  messages,
  status,
  error,
  counterpartNickname,
  currentUserId,
  onRetry,
}: MessageListProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  // Keep the latest message in view when history loads or a message arrives.
  useEffect(() => {
    const element = scrollRef.current
    if (element) element.scrollTop = element.scrollHeight
  }, [messages])

  return (
    <div
      className={styles.container}
      ref={scrollRef}
      role="log"
      aria-label={`Messages with ${counterpartNickname}`}
      aria-busy={status === 'loading'}
    >
      {error !== null ? (
        <div className={styles.stateBox}>
          <p className={styles.stateText} role="alert">
            {error}
          </p>
          <button type="button" className={styles.retryButton} onClick={onRetry}>
            Retry
          </button>
        </div>
      ) : status === 'loading' ? (
        <p className={styles.stateText} aria-busy="true">
          Loading messages…
        </p>
      ) : messages.length === 0 ? (
        <p className={styles.stateText}>
          No messages yet. Say hello to {counterpartNickname}!
        </p>
      ) : (
        <ul className={styles.list}>
          {messages.map((message) => {
            const own = isOwnMessage(message.authorId, currentUserId)
            return (
              <li
                key={message.id}
                className={own ? `${styles.item} ${styles.itemOwn}` : styles.item}
              >
                {!own && (
                  <span className={styles.author}>{counterpartNickname}</span>
                )}
                <div
                  className={
                    own ? `${styles.bubble} ${styles.bubbleOwn}` : styles.bubble
                  }
                >
                  <p className={styles.body}>{message.body}</p>
                  <time
                    className={styles.time}
                    dateTime={new Date(message.timestamp).toISOString()}
                  >
                    {formatMessageTime(message.timestamp)}
                  </time>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

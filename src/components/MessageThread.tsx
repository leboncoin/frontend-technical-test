import type { ReactElement, ReactNode } from 'react';
import type { Message } from '../types/message';
import type { LoadState } from '../types/loadState';
import { formatTimestamp } from '../utils/messagingView';
import { Avatar } from './Avatar';
import styles from '../styles/Home.module.css';

interface ThreadParticipant {
  nickname: string;
}

interface MessageThreadProps {
  children: ReactNode;
  isVisibleOnMobile: boolean;
  loggedUserId: number;
  messageState: LoadState;
  messages: Message[];
  participant: ThreadParticipant | null;
  selectedConversationId: number | null;
  onBack: () => void;
  onRetryMessages: (conversationId: number) => void;
}

export const MessageThread = ({
  children,
  isVisibleOnMobile,
  loggedUserId,
  messageState,
  messages,
  participant,
  selectedConversationId,
  onBack,
  onRetryMessages,
}: MessageThreadProps): ReactElement => {
  const hasSelectedThread =
    participant !== null && selectedConversationId !== null;

  return (
    <section
      className={`${styles.thread} ${isVisibleOnMobile ? styles.threadVisibleMobile : ''}`}
      aria-label={hasSelectedThread ? undefined : 'Conversation'}
      aria-labelledby={hasSelectedThread ? 'thread-title' : undefined}
    >
      {!hasSelectedThread ? (
        <div className={styles.emptyThread}>
          Sélectionnez une conversation pour consulter les messages.
        </div>
      ) : (
        <>
          <div className={styles.threadHeader}>
            <button
              className={styles.backButton}
              type="button"
              aria-label="Retour aux conversations"
              onClick={onBack}
            >
              <svg
                aria-hidden="true"
                focusable="false"
                viewBox="0 0 24 24"
                className={styles.backIcon}
              >
                <path
                  d="M15 18L9 12L15 6"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </button>
            <div className={styles.threadIdentity}>
              <Avatar nickname={participant.nickname} />
              <h2 id="thread-title">{participant.nickname}</h2>
            </div>
          </div>

          <div className={styles.messageList} aria-live="polite">
            {messageState === 'loading' && (
              <div className={styles.status} role="status">
                Chargement des messages...
              </div>
            )}

            {messageState === 'error' && (
              <div className={styles.errorBox} role="alert">
                Impossible de charger les messages.
                <button
                  className={styles.inlineButton}
                  type="button"
                  onClick={() => onRetryMessages(selectedConversationId)}
                >
                  Réessayer
                </button>
              </div>
            )}

            {messageState === 'success' && messages.length === 0 && (
              <div className={styles.emptyState}>
                Aucun message dans cette conversation.
              </div>
            )}

            {messages.map((message) => {
              const isOwnMessage = message.authorId === loggedUserId;

              return (
                <article
                  className={`${styles.messageRow} ${isOwnMessage ? styles.ownMessageRow : ''}`}
                  key={message.id}
                >
                  <div
                    className={`${styles.messageBubble} ${isOwnMessage ? styles.ownMessage : ''}`}
                  >
                    <p>{message.body}</p>
                    <time
                      dateTime={new Date(
                        message.timestamp * 1000
                      ).toISOString()}
                    >
                      {formatTimestamp(message.timestamp)}
                    </time>
                  </div>
                </article>
              );
            })}
          </div>

          {children}
        </>
      )}
    </section>
  );
};

import type { ReactElement } from 'react';
import type { Conversation } from '../types/conversation';
import type { LoadState } from '../types/loadState';
import {
  formatConversationTimestamp,
  getConversationParticipant,
} from '../utils/messagingView';
import { Avatar } from './Avatar';
import styles from '../styles/Home.module.css';

interface ConversationListProps {
  conversations: Conversation[];
  conversationState: LoadState;
  loggedUserId: number;
  selectedConversationId: number | null;
  totalConversationCount: number;
  onRetry: () => void;
  onSelectConversation: (conversationId: number) => void;
}

export const ConversationList = ({
  conversations,
  conversationState,
  loggedUserId,
  selectedConversationId,
  totalConversationCount,
  onRetry,
  onSelectConversation,
}: ConversationListProps): ReactElement => {
  if (conversationState === 'idle') {
    return <></>;
  }

  if (conversationState === 'loading') {
    return (
      <div className={styles.status} role="status">
        Chargement des conversations...
      </div>
    );
  }

  if (conversationState === 'error') {
    return (
      <div className={styles.errorBox} role="alert">
        Impossible de charger les conversations.
        <button className={styles.inlineButton} type="button" onClick={onRetry}>
          Réessayer
        </button>
      </div>
    );
  }

  if (conversationState === 'success' && totalConversationCount === 0) {
    return (
      <div className={styles.emptyState}>
        Aucune conversation pour le moment.
      </div>
    );
  }

  if (
    conversationState === 'success' &&
    totalConversationCount > 0 &&
    conversations.length === 0
  ) {
    return (
      <div className={styles.emptyState}>
        Aucune conversation ne correspond à cette recherche.
      </div>
    );
  }

  return (
    <ul
      className={styles.conversationList}
      aria-label="Liste des conversations"
    >
      {conversations.map((conversation) => {
        const participant = getConversationParticipant(
          conversation,
          loggedUserId
        );
        const isSelected = conversation.id === selectedConversationId;

        return (
          <li key={conversation.id}>
            <button
              className={`${styles.conversationButton} ${isSelected ? styles.selectedConversation : ''}`}
              type="button"
              aria-current={isSelected ? 'true' : undefined}
              onClick={() => onSelectConversation(conversation.id)}
            >
              <Avatar nickname={participant.nickname} />
              <span className={styles.conversationMeta}>
                <span className={styles.conversationSummary}>
                  <span className={styles.conversationName}>
                    {participant.nickname}
                  </span>
                  <span className={styles.conversationDate}>
                    {formatConversationTimestamp(
                      conversation.lastMessageTimestamp
                    )}
                  </span>
                </span>
                <span className={styles.conversationPreview}>
                  {conversation.lastMessageBody || 'Aucun message'}
                </span>
              </span>
              <span className={styles.conversationChevron} aria-hidden="true" />
            </button>
          </li>
        );
      })}
    </ul>
  );
};

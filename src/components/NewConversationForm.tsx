import type { FormEvent, ReactElement } from 'react';
import type { LoadState } from '../types/loadState';
import type { User } from '../types/user';
import styles from '../styles/Home.module.css';

interface NewConversationFormProps {
  availableRecipientsCount: number;
  canCreateConversation: boolean;
  createConversationError: string | null;
  isCreatingConversation: boolean;
  matchingRecipients: User[];
  query: string;
  shouldShowSuggestions: boolean;
  userState: LoadState;
  onQueryChange: (query: string) => void;
  onRetryUsers: () => void;
  onSelectRecipient: (nickname: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export const NewConversationForm = ({
  availableRecipientsCount,
  canCreateConversation,
  createConversationError,
  isCreatingConversation,
  matchingRecipients,
  query,
  shouldShowSuggestions,
  userState,
  onQueryChange,
  onRetryUsers,
  onSelectRecipient,
  onSubmit,
}: NewConversationFormProps): ReactElement => {
  const hasNoMatchingRecipient =
    userState === 'success' &&
    query.trim().length > 0 &&
    matchingRecipients.length === 0;

  return (
    <form className={styles.newConversation} onSubmit={onSubmit}>
      {shouldShowSuggestions && (
        <div
          className={styles.recipientSuggestions}
          aria-label="Contacts suggérés"
        >
          {matchingRecipients.map((user) => (
            <button
              className={styles.recipientSuggestion}
              key={user.id}
              type="button"
              onClick={() => onSelectRecipient(user.nickname)}
            >
              {user.nickname}
            </button>
          ))}
        </div>
      )}
      <label className={styles.srOnly} htmlFor="new-conversation-recipient">
        Nouvelle conversation
      </label>
      <div className={styles.newConversationControls}>
        <div className={styles.newConversationField}>
          <svg
            className={styles.newConversationIcon}
            aria-hidden="true"
            viewBox="0 0 24 24"
          >
            <circle cx="9" cy="8" r="4" />
            <path d="M3 21a6 6 0 0 1 12 0" />
            <path d="M19 8v6" />
            <path d="M16 11h6" />
          </svg>
          <input
            aria-describedby={
              hasNoMatchingRecipient ? 'new-conversation-help' : undefined
            }
            className={styles.newConversationInput}
            disabled={
              userState === 'loading' ||
              isCreatingConversation ||
              availableRecipientsCount === 0
            }
            id="new-conversation-recipient"
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Tapez un nom"
            value={query}
          />
        </div>
        <button
          className={styles.createConversationButton}
          disabled={!canCreateConversation}
          type="submit"
          title={isCreatingConversation ? 'Création en cours...' : 'Créer'}
        >
          <span className={styles.srOnly}>
            {isCreatingConversation ? 'Création en cours...' : 'Créer'}
          </span>
          <svg
            className={styles.createConversationIcon}
            aria-hidden="true"
            viewBox="0 0 24 24"
          >
            <path d="M12 5v14" />
            <path d="M5 12h14" />
          </svg>
        </button>
      </div>
      {userState === 'loading' && (
        <p className={styles.formHint} role="status">
          Chargement des contacts...
        </p>
      )}
      {userState === 'error' && (
        <p className={styles.formError} role="alert">
          Impossible de charger les contacts.
          <button
            className={styles.inlineButton}
            type="button"
            onClick={onRetryUsers}
          >
            Réessayer
          </button>
        </p>
      )}
      {userState === 'success' && availableRecipientsCount === 0 && (
        <p className={styles.formHint}>Aucun contact disponible.</p>
      )}
      {hasNoMatchingRecipient && (
        <p className={styles.formHint} id="new-conversation-help">
          Aucun contact trouvé.
        </p>
      )}
      {createConversationError !== null && (
        <p className={styles.formError} role="alert">
          {createConversationError}
        </p>
      )}
    </form>
  );
};

import type { FormEvent, ReactElement } from 'react';
import type { LoadState } from '../types/loadState';
import styles from '../styles/Home.module.css';

interface MessageComposerProps {
  canSend: boolean;
  draft: string;
  isDraftTooLong: boolean;
  isSending: boolean;
  maxLength: number;
  messageState: LoadState;
  sendError: string | null;
  onDraftChange: (draft: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export const MessageComposer = ({
  canSend,
  draft,
  isDraftTooLong,
  isSending,
  maxLength,
  messageState,
  sendError,
  onDraftChange,
  onSubmit,
}: MessageComposerProps): ReactElement => {
  return (
    <form className={styles.composer} onSubmit={onSubmit}>
      <label className={styles.srOnly} htmlFor="message-body">
        Nouveau message
      </label>
      <div className={styles.composerField}>
        <textarea
          id="message-body"
          aria-describedby="message-help"
          className={styles.textarea}
          maxLength={maxLength + 1}
          onChange={(event) => onDraftChange(event.target.value)}
          placeholder="Écrivez votre message"
          value={draft}
          disabled={isSending || messageState === 'loading'}
        />
        <button
          className={styles.primaryButton}
          type="submit"
          disabled={!canSend}
          title={isSending ? 'Envoi en cours...' : 'Envoyer'}
        >
          <span className={styles.srOnly}>
            {isSending ? 'Envoi en cours...' : 'Envoyer'}
          </span>
          <svg
            aria-hidden="true"
            focusable="false"
            viewBox="0 0 24 24"
            className={styles.sendIcon}
          >
            <path
              d="M4.5 19.5L20 12L4.5 4.5L7 11.4L14 12L7 12.6L4.5 19.5Z"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
        </button>
        <p
          className={`${styles.helpText} ${isDraftTooLong ? styles.helpTextError : ''}`}
          id="message-help"
        >
          {draft.length}/{maxLength}
        </p>
      </div>
      {sendError !== null && (
        <p className={styles.sendError} role="alert">
          {sendError}
        </p>
      )}
    </form>
  );
};

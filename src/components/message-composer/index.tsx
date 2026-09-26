import { useId, useRef, useState } from 'react'
import type { FormEvent, KeyboardEvent } from 'react'
import { MAX_MESSAGE_LENGTH } from '@constants/messages'
import { SendIcon } from '@components/icons'
import styles from './message-composer.module.css'

interface MessageComposerProps {
  /** Returns true when the server confirmed the send. */
  onSend: (text: string) => Promise<boolean>
  counterpartNickname: string
}

/**
 * Message input. Safety rules implemented here:
 * - the Send button is disabled while empty/whitespace-only or in flight,
 *   so a message can never be submitted twice concurrently (the textarea
 *   goes read-only — not disabled — so keyboard focus is retained);
 * - the composer is cleared ONLY after a confirmed success — on failure the
 *   draft is preserved so the user can retry deliberately (the app never
 *   auto-retries a POST, which could duplicate the message server-side);
 * - Enter sends, Shift+Enter inserts a newline (keyboard convenience);
 *   IME composition events are ignored so confirming a candidate does not
 *   send the message.
 */
export default function MessageComposer({
  onSend,
  counterpartNickname,
}: MessageComposerProps) {
  const inputId = useId()
  const [draft, setDraft] = useState('')
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const trimmed = draft.trim()
  const canSubmit = trimmed !== '' && !sending

  async function submit(): Promise<void> {
    if (!canSubmit) return
    setSending(true)
    setError(null)
    const succeeded = await onSend(trimmed)
    setSending(false)
    if (succeeded) {
      setDraft('')
    } else {
      setError(
        'Your message could not be sent. It has been kept below so you can try again.'
      )
      // A failed send returns the user straight to their draft: the Send
      // button is disabled while in flight, which can drop focus, so it is
      // restored to the composer for an immediate retry.
      inputRef.current?.focus()
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    void submit()
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (
      event.key === 'Enter' &&
      !event.shiftKey &&
      !event.nativeEvent.isComposing
    ) {
      event.preventDefault()
      void submit()
    }
  }

  return (
    <form className={styles.composer} onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor={inputId}>
        {`Write a message to ${counterpartNickname}`}
      </label>
      <textarea
        id={inputId}
        ref={inputRef}
        className={styles.input}
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Write a message…"
        rows={1}
        maxLength={MAX_MESSAGE_LENGTH}
        readOnly={sending}
      />
      <button
        type="submit"
        className={styles.sendButton}
        disabled={!canSubmit}
        aria-label={
          sending ? 'Sending message' : `Send message to ${counterpartNickname}`
        }
      >
        {sending ? 'Sending…' : <SendIcon />}
      </button>
      {error !== null && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}
    </form>
  )
}

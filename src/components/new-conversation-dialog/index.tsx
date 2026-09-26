import { useEffect, useRef, useState } from 'react'
import type { FormEvent, KeyboardEvent } from 'react'
import { createConversation } from '@api/conversations'
import { fetchUsers } from '@api/users'
import type { UserSummary } from '@api/users'
import { toUserMessage } from '@api/http'
import type { Conversation } from '@/types/conversation'
import { CloseIcon } from '@components/icons'
import styles from './new-conversation-dialog.module.css'

interface NewConversationDialogProps {
  currentUserId: number
  onCreated: (conversation: Conversation) => void
  onClose: () => void
}

/**
 * Bonus 1 — create a new conversation.
 *
 * The recipient list comes from GET /users (auth tokens are stripped at the
 * API boundary); the logged-in user's nickname — needed because the fixture
 * server persists exactly the body it receives — is looked up from the same
 * list. On success the created conversation is handed back to the page,
 * which inserts it into local state: the fixture server's list middleware
 * caches db.json at startup, so a fresh GET would NOT include the new
 * conversation until the server restarts (verified manually — see README,
 * "API quirks").
 */
export default function NewConversationDialog({
  currentUserId,
  onCreated,
  onClose,
}: NewConversationDialogProps) {
  const [recipients, setRecipients] = useState<UserSummary[] | null>(null)
  const [loggedUserNickname, setLoggedUserNickname] = useState('')
  const [loadError, setLoadError] = useState<string | null>(null)
  const [recipientId, setRecipientId] = useState<string>('')
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const selectRef = useRef<HTMLSelectElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let active = true
    fetchUsers()
      .then((users) => {
        if (!active) return
        const self = users.find((user) => user.id === currentUserId)
        if (self) setLoggedUserNickname(self.nickname)
        setRecipients(users.filter((user) => user.id !== currentUserId))
      })
      .catch((caught) => {
        if (active) setLoadError(toUserMessage(caught))
      })
    return () => {
      active = false
    }
  }, [currentUserId])

  // Initial focus lands inside the dialog as soon as it opens — even while
  // recipients are still loading or when loading fails (the select only
  // exists on the happy path, so the dialog container is the safe target).
  useEffect(() => {
    dialogRef.current?.focus()
  }, [])

  // Once the recipient list arrives, hand focus to the select.
  useEffect(() => {
    if (recipients !== null) selectRef.current?.focus()
  }, [recipients])

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Escape') {
      onClose()
      return
    }
    // Minimal focus trap: with aria-modal="true" announced, keyboard focus
    // must cycle inside the dialog instead of reaching the page behind it.
    if (event.key !== 'Tab' || dialogRef.current === null) return
    const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
      'button:not([disabled]), select:not([disabled]), input, textarea, [href]'
    )
    if (focusable.length === 0) return
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    const active = document.activeElement
    if (event.shiftKey && active === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && active === last) {
      event.preventDefault()
      first.focus()
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const recipient = recipients?.find(
      (user) => String(user.id) === recipientId
    )
    if (!recipient || submitting || loggedUserNickname === '') return

    setSubmitting(true)
    setSubmitError(null)
    try {
      const conversation = await createConversation({
        loggedUserId: currentUserId,
        loggedUserNickname,
        recipientId: recipient.id,
        recipientNickname: recipient.nickname,
      })
      onCreated(conversation)
    } catch (caught) {
      setSubmitting(false)
      setSubmitError(toUserMessage(caught))
    }
  }

  return (
    <div className={styles.overlay} onKeyDown={handleKeyDown}>
      <div
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="new-conversation-title"
        ref={dialogRef}
        tabIndex={-1}
      >
        <div className={styles.header}>
          <h2 className={styles.title} id="new-conversation-title">
            New conversation
          </h2>
          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close"
          >
            <CloseIcon />
          </button>
        </div>

        {loadError !== null ? (
          <p className={styles.error} role="alert">
            {loadError}
          </p>
        ) : recipients === null ? (
          <p className={styles.hint}>Loading recipients…</p>
        ) : recipients.length === 0 ? (
          <p className={styles.hint}>No other users are available.</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <label className={styles.label} htmlFor="new-conversation-recipient">
              Start a conversation with
            </label>
            <select
              id="new-conversation-recipient"
              ref={selectRef}
              className={styles.select}
              value={recipientId}
              onChange={(event) => setRecipientId(event.target.value)}
              disabled={submitting}
            >
              <option value="">Choose a recipient…</option>
              {recipients.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.nickname}
                </option>
              ))}
            </select>

            <div className={styles.actions}>
              <button
                type="button"
                className={styles.secondaryButton}
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={styles.primaryButton}
                disabled={recipientId === '' || submitting || loggedUserNickname === ''}
              >
                {submitting ? 'Creating…' : 'Create'}
              </button>
            </div>

            {submitError !== null && (
              <p className={styles.error} role="alert">
                {submitError}
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  )
}

import { useCallback, useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from 'react'
import {
  MAX_MESSAGE_LENGTH,
  SEND_DEBOUNCE_MS,
  DUPLICATE_MESSAGE_WINDOW_MS,
} from '../../lib/safety/constants'
import { canSend, getRemainingCooldownMs, recordSend } from '../../lib/safety/rateLimiter'
import { sanitizeMessage } from '../../lib/safety/sanitizeMessage'
import type { MessageInputProps } from '@/types'

export const MessageInput = ({ conversationId, onSend, disabled = false }: MessageInputProps) => {
  const [value, setValue] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isSending, setIsSending] = useState(false)
  const lastSentRef = useRef<{ body: string; at: number } | null>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const conversationKey = String(conversationId)

  const handleSend = useCallback(async () => {
    if (isSending || disabled) return

    const sanitized = sanitizeMessage(value)
    if (!sanitized.valid) {
      setError(sanitized.error ?? 'Invalid message.')
      return
    }

    if (!canSend(conversationKey)) {
      const remaining = Math.ceil(getRemainingCooldownMs(conversationKey) / 1000)
      setError(`Too many messages sent. Try again in ${remaining}s.`)
      return
    }

    const now = Date.now()
    const lastSent = lastSentRef.current
    if (
      lastSent &&
      lastSent.body === sanitized.value &&
      now - lastSent.at < DUPLICATE_MESSAGE_WINDOW_MS
    ) {
      setError('This message was just sent.')
      return
    }

    setError(null)
    setIsSending(true)
    const bodyToSend = sanitized.value
    setValue('')

    try {
      await onSend(bodyToSend)
      recordSend(conversationKey, now)
      lastSentRef.current = { body: bodyToSend, at: now }
    } catch {
      setValue(bodyToSend)
      setError('Failed to send. Please try again.')
    } finally {
      setIsSending(false)
    }
  }, [conversationKey, disabled, isSending, onSend, value])

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [])

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      void handleSend()
    }, SEND_DEBOUNCE_MS)
  }

  const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      if (debounceRef.current) clearTimeout(debounceRef.current)
      debounceRef.current = setTimeout(() => {
        void handleSend()
      }, SEND_DEBOUNCE_MS)
    }
  }

  const charCount = value.length
  const isOverLimit = charCount > MAX_MESSAGE_LENGTH

  return (
    <form
      className="shrink-0 border-t border-neutral-200 bg-white px-4 pt-3 pb-4"
      onSubmit={onSubmit}
      aria-label="Send a message"
    >
      <div className="flex items-center rounded-full border border-neutral-300 bg-white py-1 pr-2 pl-4">
        <label htmlFor="message-input" className="sr-only">
          Your message
        </label>
        <textarea
          id="message-input"
          className="max-h-[120px] min-h-0 flex-1 resize-none border-none bg-transparent py-2 text-[0.95rem] leading-snug text-neutral-900 outline-none placeholder:text-neutral-400 disabled:opacity-60"
          value={value}
          onChange={(e) => {
            setValue(e.target.value.slice(0, MAX_MESSAGE_LENGTH))
            setError(null)
          }}
          onKeyDown={onKeyDown}
          placeholder="Send message"
          rows={1}
          maxLength={MAX_MESSAGE_LENGTH}
          disabled={disabled || isSending}
          aria-describedby="message-counter message-error"
        />
        <button
          type="submit"
          className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full border-none bg-transparent text-[1.1rem] text-neutral-400 hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-40"
          disabled={disabled || isSending || !value.trim()}
          aria-label="Send"
        >
          ➤
        </button>
      </div>
      <div className="mt-1.5 flex min-h-5 items-center justify-between gap-2 px-2">
        <span
          id="message-counter"
          className={isOverLimit ? 'text-xs text-danger' : 'text-xs text-neutral-400'}
          aria-live="polite"
        >
          {charCount}/{MAX_MESSAGE_LENGTH}
        </span>
        {error && (
          <span id="message-error" className="text-right text-[0.8rem] text-danger" role="alert">
            {error}
          </span>
        )}
      </div>
    </form>
  )
}

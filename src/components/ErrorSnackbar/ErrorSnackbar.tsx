import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import type { ErrorSnackbarProps } from '@/types'

export const ErrorSnackbar = ({
  message,
  onRetry,
  onDismiss,
  retryInMs = 30_000,
}: ErrorSnackbarProps) => {
  const [secondsLeft, setSecondsLeft] = useState(Math.ceil(retryInMs / 1000))
  const [dismissed, setDismissed] = useState(false)
  const [mounted, setMounted] = useState(false)
  const hasAutoRetriedRef = useRef(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    setDismissed(false)
    hasAutoRetriedRef.current = false
    setSecondsLeft(Math.ceil(retryInMs / 1000))
  }, [message, retryInMs])

  useEffect(() => {
    if (dismissed || secondsLeft <= 0) return

    const timer = window.setTimeout(() => {
      setSecondsLeft((prev) => prev - 1)
    }, 1000)

    return () => window.clearTimeout(timer)
  }, [dismissed, secondsLeft])

  useEffect(() => {
    if (dismissed || secondsLeft > 0 || hasAutoRetriedRef.current) return

    hasAutoRetriedRef.current = true
    onRetry()
  }, [dismissed, onRetry, secondsLeft])

  const handleDismiss = () => {
    setDismissed(true)
    onDismiss?.()
  }

  if (!mounted || dismissed) return null

  return createPortal(
    <div
      className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center p-4 pb-6 sm:p-6"
      aria-live="assertive"
    >
      <div
        className="pointer-events-auto flex w-full max-w-lg animate-snackbar-in items-start gap-3 rounded-2xl border border-neutral-200 border-l-4 border-l-brand bg-white p-4 shadow-[0_16px_48px_rgba(0,0,0,0.18)]"
        role="alert"
      >
        <div
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-orange-50 text-xl"
          aria-hidden="true"
        >
          ☕
        </div>

        <div className="min-w-0 flex-1">
          <p className="m-0 text-[0.95rem] font-bold text-neutral-900">
            It&apos;s not you, it&apos;s me.
          </p>
          <p className="m-0 mt-1 text-sm leading-snug text-neutral-600">{message}</p>
          {secondsLeft > 0 && (
            <p className="m-0 mt-2 text-xs text-neutral-500">
              Retrying automatically in {secondsLeft}s…
            </p>
          )}
        </div>

        <div className="flex shrink-0 flex-col items-end gap-2">
          <button
            type="button"
            className="cursor-pointer rounded-full border-none bg-brand px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-brand-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            onClick={onRetry}
          >
            Retry now
          </button>
          <button
            type="button"
            className="cursor-pointer border-none bg-transparent p-1 text-lg leading-none text-neutral-400 hover:text-neutral-700 focus-visible:rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            onClick={handleDismiss}
            aria-label="Dismiss"
          >
            ×
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}

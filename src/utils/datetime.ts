/**
 * Date/time formatting for the messaging UI.
 *
 * Pure functions with an explicit locale so rendering is deterministic and
 * unit-testable (the app copy is English, like the supplied sketches).
 */
const LOCALE = 'en-US'

const timeFormatter = new Intl.DateTimeFormat(LOCALE, {
  hour: 'numeric',
  minute: '2-digit',
})

const dateFormatter = new Intl.DateTimeFormat(LOCALE, {
  day: 'numeric',
  month: 'short',
})

function startOfDay(date: Date): number {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime()
}

function dayDelta(timestampMs: number, now: Date): number {
  return Math.round((startOfDay(now) - startOfDay(new Date(timestampMs))) / 86_400_000)
}

export function formatMessageTime(timestampMs: number): string {
  return timeFormatter.format(new Date(timestampMs))
}

/** Compact date for the conversation list: time today, "Yesterday", else date. */
export function formatConversationListDate(
  timestampMs: number,
  now: Date = new Date()
): string {
  const days = dayDelta(timestampMs, now)
  if (days === 0) return timeFormatter.format(new Date(timestampMs))
  if (days === 1) return 'Yesterday'
  return dateFormatter.format(new Date(timestampMs))
}

/** Human sentence for the conversation panel subtitle. */
export function formatLastMessageDate(
  timestampMs: number,
  now: Date = new Date()
): string {
  const days = dayDelta(timestampMs, now)
  if (days === 0) return `Today at ${formatMessageTime(timestampMs)}`
  if (days === 1) return `Yesterday at ${formatMessageTime(timestampMs)}`
  return `${dateFormatter.format(new Date(timestampMs))} at ${formatMessageTime(timestampMs)}`
}

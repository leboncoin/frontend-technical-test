/**
 * Normalization helpers applied once, at the API boundary.
 *
 * The API is inconsistent about timestamps:
 * - the Swagger file declares `Message.timestamp` as a string while
 *   `Conversation.lastMessageTimestamp` is an integer;
 * - the actual fixtures return Unix SECONDS as numbers for both.
 *
 * The app works exclusively in JavaScript epoch MILLISECONDS, so every
 * timestamp from the network goes through `toMsTimestamp` here.
 */

/**
 * Unix seconds below ~10^11 describe dates after 1973 only when interpreted
 * as seconds (10^11 seconds ≈ year 5138, 10^11 ms ≈ 1973). Values below the
 * threshold are therefore treated as seconds, above it as milliseconds.
 */
const SECONDS_VS_MS_THRESHOLD = 1e11

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

/** Entity id accepted by the API layer: a non-negative integer. */
export function toId(value: unknown): number | null {
  const id = toFiniteNumber(value)

  return id !== null && Number.isInteger(id) && id >= 0 ? id : null
}

export function toMsTimestamp(value: unknown): number | null {
  let candidate: number

  if (typeof value === 'number') {
    if (!Number.isFinite(value)) return null
    candidate = value
  } else if (typeof value === 'string') {
    const trimmed = value.trim()
    if (!trimmed) return null
    const asNumber = Number(trimmed)
    if (Number.isFinite(asNumber)) {
      candidate = asNumber
    } else {
      // Swagger says "string": tolerate ISO-8601 dates if a backend ever sends them.
      const parsed = Date.parse(trimmed)
      return Number.isNaN(parsed) ? null : parsed
    }
  } else {
    return null
  }

  if (candidate <= 0) return null
  return candidate < SECONDS_VS_MS_THRESHOLD ? candidate * 1000 : candidate
}

export function toFiniteNumber(value: unknown): number | null {
  return typeof value === 'number' && Number.isFinite(value) ? value : null
}

export function toNonEmptyString(value: unknown): string | null {
  return typeof value === 'string' && value.trim() !== '' ? value : null
}

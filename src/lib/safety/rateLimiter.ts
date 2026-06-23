import { RATE_LIMIT_MAX, RATE_LIMIT_WINDOW_MS } from './constants'

interface RateLimiterState {
  timestamps: number[]
}

const limiters = new Map<string, RateLimiterState>()

export const canSend = (conversationKey: string, now = Date.now()): boolean => {
  const state = limiters.get(conversationKey) ?? { timestamps: [] }
  const recent = state.timestamps.filter((ts) => now - ts < RATE_LIMIT_WINDOW_MS)
  return recent.length < RATE_LIMIT_MAX
}

export const recordSend = (conversationKey: string, now = Date.now()): void => {
  const state = limiters.get(conversationKey) ?? { timestamps: [] }
  const recent = state.timestamps.filter((ts) => now - ts < RATE_LIMIT_WINDOW_MS)
  recent.push(now)
  limiters.set(conversationKey, { timestamps: recent })
}

export const resetRateLimiter = (conversationKey?: string): void => {
  if (conversationKey) {
    limiters.delete(conversationKey)
    return
  }
  limiters.clear()
}

export const getRemainingCooldownMs = (conversationKey: string, now = Date.now()): number => {
  const state = limiters.get(conversationKey)
  if (!state || state.timestamps.length < RATE_LIMIT_MAX) return 0

  const recent = state.timestamps
    .filter((ts) => now - ts < RATE_LIMIT_WINDOW_MS)
    .sort((a, b) => a - b)

  if (recent.length < RATE_LIMIT_MAX) return 0

  const oldest = recent[0]
  return Math.max(0, RATE_LIMIT_WINDOW_MS - (now - oldest))
}

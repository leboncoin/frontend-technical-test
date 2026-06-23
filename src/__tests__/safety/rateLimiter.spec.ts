import { canSend, recordSend, resetRateLimiter } from '../../lib/safety/rateLimiter'
import { RATE_LIMIT_MAX } from '../../lib/safety/constants'

describe('rateLimiter', () => {
  beforeEach(() => {
    resetRateLimiter()
  })

  it('allows sends under the limit', () => {
    const key = 'conv-1'
    for (let i = 0; i < RATE_LIMIT_MAX; i += 1) {
      expect(canSend(key, 1000 + i)).toBe(true)
      recordSend(key, 1000 + i)
    }
  })

  it('blocks sends over the limit within the window', () => {
    const key = 'conv-2'
    const now = 5000
    for (let i = 0; i < RATE_LIMIT_MAX; i += 1) {
      recordSend(key, now + i)
    }
    expect(canSend(key, now + RATE_LIMIT_MAX)).toBe(false)
  })

  it('resets after the window expires', () => {
    const key = 'conv-3'
    const start = 10_000
    for (let i = 0; i < RATE_LIMIT_MAX; i += 1) {
      recordSend(key, start + i)
    }
    expect(canSend(key, start + 61_000)).toBe(true)
  })
})

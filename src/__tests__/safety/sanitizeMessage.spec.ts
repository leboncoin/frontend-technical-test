import { sanitizeMessage } from '../../lib/safety/sanitizeMessage'
import { MAX_MESSAGE_LENGTH } from '../../lib/safety/constants'

describe('sanitizeMessage', () => {
  it('rejects empty messages', () => {
    const result = sanitizeMessage('   ')
    expect(result.valid).toBe(false)
    expect(result.error).toBeDefined()
  })

  it('strips null bytes and control characters', () => {
    const result = sanitizeMessage('hello\u0000world\x07')
    expect(result.valid).toBe(true)
    expect(result.value).toBe('helloworld')
  })

  it('collapses excessive newlines', () => {
    const result = sanitizeMessage('a\n\n\n\nb')
    expect(result.valid).toBe(true)
    expect(result.value).toBe('a\n\nb')
  })

  it('rejects messages over max length', () => {
    const result = sanitizeMessage('a'.repeat(MAX_MESSAGE_LENGTH + 1))
    expect(result.valid).toBe(false)
  })

  it('accepts valid messages', () => {
    const result = sanitizeMessage('  Bonjour !  ')
    expect(result.valid).toBe(true)
    expect(result.value).toBe('Bonjour !')
  })
})

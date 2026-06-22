import {
  formatConversationDate,
  formatLastMessageLabel,
  formatMessageTime,
  getAvatarColor,
  getInitial,
} from '@/lib/display'

describe('display helpers', () => {
  beforeEach(() => {
    jest.useFakeTimers()
    jest.setSystemTime(new Date('2026-06-22T14:00:00'))
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('formats conversation dates', () => {
    const thisYear = Math.floor(new Date('2026-03-15T10:00:00').getTime() / 1000)
    const otherYear = Math.floor(new Date('2024-03-15T10:00:00').getTime() / 1000)

    expect(formatConversationDate(thisYear)).toBe('March 15')
    expect(formatConversationDate(otherYear)).toBe('March')
  })

  it('formats message times and labels', () => {
    const timestamp = Math.floor(new Date('2026-06-22T09:30:00').getTime() / 1000)

    expect(formatMessageTime(timestamp)).toMatch(/^today at /)
    expect(formatLastMessageLabel(timestamp)).toMatch(/^Last message today at /)
  })

  it('derives avatar initials and colors', () => {
    expect(getInitial('jeremie')).toBe('J')
    expect(getInitial('   ')).toBe('?')
    expect(getAvatarColor('Jeremie')).toBe(getAvatarColor('Jeremie'))
    expect(getAvatarColor(2)).toMatch(/^#[0-9a-f]{6}$/i)
  })
})

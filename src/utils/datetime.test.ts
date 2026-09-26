import {
  formatConversationListDate,
  formatLastMessageDate,
  formatMessageTime,
} from './datetime'

describe('datetime formatting', () => {
  const NOW = new Date(2026, 8, 23, 15, 0) // 23 Sep 2026, 15:00 local

  beforeAll(() => {
    jest.useFakeTimers()
    jest.setSystemTime(NOW)
  })

  afterAll(() => {
    jest.useRealTimers()
  })

  describe('formatConversationListDate', () => {
    it('shows only the time for today', () => {
      expect(
        formatConversationListDate(new Date(2026, 8, 23, 14, 45).getTime())
      ).toBe('2:45 PM')
    })

    it('shows "Yesterday" the day before', () => {
      expect(
        formatConversationListDate(new Date(2026, 8, 22, 9, 30).getTime())
      ).toBe('Yesterday')
    })

    it('shows a compact date for anything older', () => {
      expect(
        formatConversationListDate(new Date(2021, 6, 7, 12, 0).getTime())
      ).toBe('Jul 7')
    })

    it('treats a message sent just after midnight as today', () => {
      expect(
        formatConversationListDate(new Date(2026, 8, 23, 0, 5).getTime())
      ).toBe('12:05 AM')
    })

    it('still says "Yesterday" for a message sent just before midnight', () => {
      expect(
        formatConversationListDate(new Date(2026, 8, 22, 23, 59).getTime())
      ).toBe('Yesterday')
    })
  })

  describe('formatLastMessageDate', () => {
    it('prefixes today and yesterday with a sentence', () => {
      expect(
        formatLastMessageDate(new Date(2026, 8, 23, 14, 45).getTime())
      ).toBe('Today at 2:45 PM')
      expect(
        formatLastMessageDate(new Date(2026, 8, 22, 9, 5).getTime())
      ).toBe('Yesterday at 9:05 AM')
    })

    it('treats a message sent just after midnight as today', () => {
      expect(
        formatLastMessageDate(new Date(2026, 8, 23, 0, 5).getTime())
      ).toBe('Today at 12:05 AM')
    })

    it('combines date and time for older messages', () => {
      expect(
        formatLastMessageDate(new Date(2021, 6, 7, 16, 5).getTime())
      ).toBe('Jul 7 at 4:05 PM')
    })
  })

  describe('formatMessageTime', () => {
    it('formats hours and minutes', () => {
      expect(
        formatMessageTime(new Date(2026, 8, 23, 9, 5).getTime())
      ).toBe('9:05 AM')
    })
  })
})

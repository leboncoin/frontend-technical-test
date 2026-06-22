import {
  isConversation,
  isMessage,
  parseConversations,
  parseMessages,
  parseUsers,
} from '../../lib/safety/parseApiResponse'

describe('parseApiResponse', () => {
  it('validates conversation shape', () => {
    expect(
      isConversation({
        id: 1,
        senderId: 1,
        senderNickname: 'A',
        recipientId: 2,
        recipientNickname: 'B',
        lastMessageTimestamp: 123,
      })
    ).toBe(true)
    expect(isConversation({ id: 'bad' })).toBe(false)
  })

  it('validates message shape', () => {
    expect(
      isMessage({
        id: 1,
        conversationId: 1,
        authorId: 1,
        timestamp: 123,
        body: 'hi',
      })
    ).toBe(true)
    expect(isMessage(null)).toBe(false)
  })

  it('filters malformed conversations', () => {
    const result = parseConversations([
      {
        id: 1,
        senderId: 1,
        senderNickname: 'A',
        recipientId: 2,
        recipientNickname: 'B',
        lastMessageTimestamp: 123,
      },
      { invalid: true },
    ])
    expect(result).toHaveLength(1)
  })

  it('strips tokens from users', () => {
    const result = parseUsers([
      { id: 1, nickname: 'Thibaut', token: 'secret' },
      { id: 2, nickname: 'bad' },
    ])
    expect(result).toEqual([{ id: 1, nickname: 'Thibaut' }])
    expect(result[0]).not.toHaveProperty('token')
  })

  it('returns empty array for non-array message data', () => {
    expect(parseMessages(null)).toEqual([])
    expect(parseMessages({})).toEqual([])
  })
})

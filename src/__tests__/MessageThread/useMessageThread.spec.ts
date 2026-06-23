import { renderHook } from '@testing-library/react'
import type { Conversation } from '@/types'

const conversation: Conversation = {
  id: 1,
  senderId: 1,
  senderNickname: 'Thibaut',
  recipientId: 2,
  recipientNickname: 'Jeremie',
  lastMessageTimestamp: 1625637849,
}

const mockSend = jest.fn()

jest.mock('@/api/queries', () => ({
  useMessagesQuery: () => ({
    data: [
      {
        id: 1,
        conversationId: 1,
        authorId: 1,
        body: 'Hello',
        timestamp: 1625637849,
      },
    ],
    error: null,
    isLoading: false,
    refetch: jest.fn(),
  }),
}))

jest.mock('@/api/mutations', () => ({
  useSendMessageMutation: () => ({
    mutateAsync: mockSend,
  }),
}))

beforeAll(() => {
  Element.prototype.scrollIntoView = jest.fn()
})

import { useMessageThread } from '@/components/MessageThread/useMessageThread'

describe('useMessageThread', () => {
  it('sorts messages and exposes access for participants', () => {
    const { result } = renderHook(() => useMessageThread({ conversation, loggedUserId: 1 }))

    expect(result.current.hasAccess).toBe(true)
    expect(result.current.sortedMessages).toHaveLength(1)
    expect(result.current.sortedMessages[0].body).toBe('Hello')
  })

  it('denies access to third parties', () => {
    const { result } = renderHook(() => useMessageThread({ conversation, loggedUserId: 99 }))

    expect(result.current.hasAccess).toBe(false)
  })
})

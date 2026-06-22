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

jest.mock('@/api/queries', () => ({
  useConversationsQuery: () => ({
    data: [conversation],
    error: null,
    isLoading: false,
    refetch: jest.fn(),
  }),
}))

import { useConversationList } from '@/components/ConversationList/useConversationList'

describe('useConversationList', () => {
  it('maps conversations into list items', () => {
    const { result } = renderHook(() =>
      useConversationList({
        loggedUserId: 1,
        selectedId: 1,
        onSelect: jest.fn(),
        onNewConversation: jest.fn(),
      })
    )

    expect(result.current.items).toHaveLength(1)
    expect(result.current.items[0].contactNickname).toBe('Jeremie')
    expect(result.current.items[0].isSelected).toBe(true)
  })
})

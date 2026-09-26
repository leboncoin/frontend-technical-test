import { act, renderHook, waitFor } from '@testing-library/react'
import { useConversations } from './useConversations'
import { fetchConversations } from '@api/conversations'
import type { Conversation } from '@/types/conversation'

jest.mock('@api/conversations', () => ({
  fetchConversations: jest.fn(),
}))

const fetchConversationsMock = jest.mocked(fetchConversations)

function conversation(
  overrides: Partial<Conversation> & Pick<Conversation, 'id'>
): Conversation {
  return {
    senderId: 1,
    senderNickname: 'Thibaut',
    recipientId: 2,
    recipientNickname: 'Jeremie',
    lastMessageTimestamp: 0,
    ...overrides,
  }
}

async function renderWithConversations(
  // Pre-sorted most recent first, as the API layer returns it.
  list: Conversation[]
) {
  fetchConversationsMock.mockResolvedValue(list)
  const utils = renderHook(() => useConversations(1))
  await waitFor(() => expect(utils.result.current.status).toBe('success'))
  return utils
}

beforeEach(() => {
  fetchConversationsMock.mockReset()
})

describe('useConversations.upsertConversation', () => {
  it('replaces the existing entry instead of duplicating it', async () => {
    const { result } = await renderWithConversations([
      conversation({ id: 2, lastMessageTimestamp: 3000 }),
      conversation({ id: 1, lastMessageTimestamp: 1000 }),
    ])

    act(() => {
      result.current.upsertConversation(
        conversation({
          id: 1,
          lastMessageTimestamp: 5000,
          recipientNickname: 'Renamed',
        })
      )
    })

    expect(result.current.conversations).toHaveLength(2)
    // The refreshed row wins its slot and jumps to the top by recency.
    expect(result.current.conversations[0]).toMatchObject({
      id: 1,
      recipientNickname: 'Renamed',
    })
  })

  it('inserts a brand-new conversation at its recency position', async () => {
    const { result } = await renderWithConversations([
      conversation({ id: 2, lastMessageTimestamp: 3000 }),
      conversation({ id: 1, lastMessageTimestamp: 1000 }),
    ])

    act(() => {
      result.current.upsertConversation(
        conversation({ id: 9, lastMessageTimestamp: 2000 })
      )
    })

    expect(result.current.conversations.map((item) => item.id)).toEqual([
      2, 9, 1,
    ])
  })
})

describe('useConversations.touchConversation', () => {
  it('bumps only the touched conversation and re-sorts the list', async () => {
    const { result } = await renderWithConversations([
      conversation({ id: 2, lastMessageTimestamp: 3000 }),
      conversation({ id: 1, lastMessageTimestamp: 1000 }),
    ])

    act(() => {
      result.current.touchConversation(1, 4000)
    })

    expect(result.current.conversations.map((item) => item.id)).toEqual([1, 2])
    expect(
      result.current.conversations.find((item) => item.id === 2)
        ?.lastMessageTimestamp
    ).toBe(3000)
  })

  it('never lowers a timestamp when touched with an older value', async () => {
    const { result } = await renderWithConversations([
      conversation({ id: 2, lastMessageTimestamp: 3000 }),
      conversation({ id: 1, lastMessageTimestamp: 1000 }),
    ])

    act(() => {
      result.current.touchConversation(2, 500)
    })

    // Math.max guard: an out-of-order touch must not demote the conversation.
    expect(result.current.conversations.map((item) => item.id)).toEqual([2, 1])
    expect(result.current.conversations[0].lastMessageTimestamp).toBe(3000)
  })
})

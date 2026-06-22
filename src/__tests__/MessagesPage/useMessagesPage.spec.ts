import { act, renderHook } from '@testing-library/react'
import type { Conversation } from '@/types'

const mockPush = jest.fn()
const mockReplace = jest.fn()
let mockQuery: Record<string, string | string[] | undefined> = {}
let mockIsReady = true
let mockConversations: Conversation[] = []
const mockRefetch = jest.fn()

jest.mock('next/router', () => ({
  useRouter: () => ({
    query: mockQuery,
    isReady: mockIsReady,
    push: mockPush,
    replace: mockReplace,
  }),
}))

jest.mock('@/api/queries', () => ({
  useConversationsQuery: () => ({
    data: mockConversations,
    refetch: mockRefetch,
  }),
}))

import { useMessagesPage } from '@/components/MessagesPage/useMessagesPage'

const conversation: Conversation = {
  id: 1,
  senderId: 1,
  senderNickname: 'Thibaut',
  recipientId: 2,
  recipientNickname: 'Jeremie',
  lastMessageTimestamp: 1625637849,
}

const mockMatchMedia = (matches: boolean) => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query: string) => ({
      matches,
      media: query,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    })),
  })
}

describe('useMessagesPage', () => {
  beforeEach(() => {
    mockQuery = {}
    mockIsReady = true
    mockConversations = [conversation]
    mockPush.mockReset()
    mockReplace.mockReset()
    mockRefetch.mockReset()
    mockMatchMedia(false)
  })

  it('shows the list on mobile when no conversation is selected', () => {
    const { result } = renderHook(() => useMessagesPage())

    expect(result.current.showList).toBe(true)
    expect(result.current.showThread).toBe(false)
  })

  it('shows the thread on mobile when a conversation is selected', () => {
    mockQuery = { id: '1' }

    const { result } = renderHook(() => useMessagesPage())

    expect(result.current.showList).toBe(false)
    expect(result.current.showThread).toBe(true)
    expect(result.current.contactName).toBe('Jeremie')
  })

  it('keeps the list visible on mobile while selection is still resolving', () => {
    mockQuery = { id: '99' }
    mockConversations = []

    const { result } = renderHook(() => useMessagesPage())

    expect(result.current.showList).toBe(true)
    expect(result.current.showThread).toBe(false)
  })

  it('shows both panes on desktop when a conversation is selected', () => {
    mockMatchMedia(true)
    mockQuery = { id: '1' }

    const { result } = renderHook(() => useMessagesPage())

    expect(result.current.isDesktop).toBe(true)
    expect(result.current.showList).toBe(true)
    expect(result.current.showThread).toBe(true)
  })

  it('navigates with shallow routing when selecting a conversation', () => {
    const { result } = renderHook(() => useMessagesPage())

    act(() => {
      result.current.handleSelect(2)
    })

    expect(mockPush).toHaveBeenCalledWith({ pathname: '/messages', query: { id: 2 } }, undefined, {
      shallow: true,
    })
  })

  it('strips invalid ids from the url', () => {
    mockQuery = { id: 'invalid' }

    renderHook(() => useMessagesPage())

    expect(mockReplace).toHaveBeenCalledWith('/messages', undefined, { shallow: true })
  })

  it('refetches and selects after creating a conversation', () => {
    const { result } = renderHook(() => useMessagesPage())

    act(() => {
      result.current.handleCreated(4)
    })

    expect(mockRefetch).toHaveBeenCalled()
    expect(mockPush).toHaveBeenCalledWith({ pathname: '/messages', query: { id: 4 } }, undefined, {
      shallow: true,
    })
  })
})

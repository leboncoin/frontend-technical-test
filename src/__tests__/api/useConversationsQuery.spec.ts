import { renderHook, waitFor } from '@testing-library/react'
import { useConversationsQuery } from '@/api/queries'
import { createQueryWrapper, mockFetch } from '../helpers/test-utils'

const conversation = {
  id: 1,
  recipientId: 2,
  recipientNickname: 'Jeremie',
  senderId: 1,
  senderNickname: 'Thibaut',
  lastMessageTimestamp: 1625637849,
}

describe('useConversationsQuery', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('fetches and parses conversations', async () => {
    mockFetch(
      jest.fn().mockResolvedValue({
        ok: true,
        json: async () => [conversation],
      } as Response)
    )

    const { Wrapper } = createQueryWrapper()
    const { result } = renderHook(() => useConversationsQuery(1), { wrapper: Wrapper })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.data).toEqual([conversation])
    expect(globalThis.fetch).toHaveBeenCalledWith('/api/conversations/1', { cache: 'no-store' })
  })

  it('surfaces fetch errors for the snackbar', async () => {
    mockFetch(
      jest.fn().mockResolvedValue({
        ok: false,
        status: 503,
        json: async () => ({}),
      } as Response)
    )

    const { Wrapper } = createQueryWrapper()
    const { result } = renderHook(() => useConversationsQuery(1), { wrapper: Wrapper })

    await waitFor(() => expect(result.current.isError).toBe(true))

    expect(result.current.error).toEqual(new Error('Request failed (503)'))
  })
})

import { renderHook, waitFor } from '@testing-library/react'
import { useMessagesQuery } from '@/api/queries'
import { createQueryWrapper, mockFetch } from '../helpers/test-utils'

const message = {
  id: 1,
  conversationId: 1,
  timestamp: 1625637849,
  authorId: 1,
  body: 'Hello',
}

describe('useMessagesQuery', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('fetches and parses messages', async () => {
    mockFetch(
      jest.fn().mockResolvedValue({
        ok: true,
        json: async () => [message],
      } as Response)
    )

    const { Wrapper } = createQueryWrapper()
    const { result } = renderHook(() => useMessagesQuery(1), { wrapper: Wrapper })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.data).toEqual([message])
    expect(globalThis.fetch).toHaveBeenCalledWith('/api/messages/1', { cache: 'no-store' })
  })

  it('does not fetch when conversationId is null', () => {
    mockFetch(jest.fn())

    const { Wrapper } = createQueryWrapper()
    renderHook(() => useMessagesQuery(null), { wrapper: Wrapper })

    expect(globalThis.fetch).not.toHaveBeenCalled()
  })

  it('surfaces fetch errors', async () => {
    mockFetch(
      jest.fn().mockResolvedValue({
        ok: false,
        status: 500,
        json: async () => ({}),
      } as Response)
    )

    const { Wrapper } = createQueryWrapper()
    const { result } = renderHook(() => useMessagesQuery(1), { wrapper: Wrapper })

    await waitFor(() => expect(result.current.isError).toBe(true))

    expect(result.current.error).toEqual(new Error('Request failed (500)'))
  })
})

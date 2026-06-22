import { renderHook } from '@testing-library/react'
import { useCreateConversationMutation } from '@/api/mutations'
import { createQueryWrapper, mockFetch } from '../helpers/test-utils'

describe('useCreateConversationMutation', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('creates a conversation and returns its id', async () => {
    mockFetch(
      jest.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ id: 4 }),
      } as Response)
    )

    const { Wrapper } = createQueryWrapper()
    const { result } = renderHook(() => useCreateConversationMutation(), { wrapper: Wrapper })

    const id = await result.current.mutateAsync({ userId: 1, recipientId: 2 })

    expect(id).toBe(4)
    expect(globalThis.fetch).toHaveBeenCalledWith('/api/conversations/1', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ recipientId: 2 }),
      cache: 'no-store',
    })
  })

  it('throws when the server responds with an error', async () => {
    mockFetch(
      jest.fn().mockResolvedValue({
        ok: false,
        status: 503,
        json: async () => ({}),
      } as Response)
    )

    const { Wrapper } = createQueryWrapper()
    const { result } = renderHook(() => useCreateConversationMutation(), { wrapper: Wrapper })

    await expect(result.current.mutateAsync({ userId: 1, recipientId: 2 })).rejects.toThrow(
      'Request failed (503)'
    )
  })
})

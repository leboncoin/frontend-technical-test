import { renderHook, waitFor } from '@testing-library/react'
import { useSendMessageMutation } from '@/api/mutations'
import { createQueryWrapper, mockFetch } from '../helpers/test-utils'

describe('useSendMessageMutation', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('posts a message with the full payload', async () => {
    mockFetch(
      jest.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ id: 99 }),
      } as Response)
    )

    const { Wrapper } = createQueryWrapper()
    const { result } = renderHook(() => useSendMessageMutation(), { wrapper: Wrapper })

    await result.current.mutateAsync({
      conversationId: 1,
      userId: 1,
      body: 'Hello',
      timestamp: 1234567890,
    })

    expect(globalThis.fetch).toHaveBeenCalledWith('/api/messages/1', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        conversationId: 1,
        authorId: 1,
        body: 'Hello',
        timestamp: 1234567890,
      }),
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
    const { result } = renderHook(() => useSendMessageMutation(), { wrapper: Wrapper })

    await expect(
      result.current.mutateAsync({
        conversationId: 1,
        userId: 1,
        body: 'Hello',
        timestamp: 1234567890,
      })
    ).rejects.toThrow('Request failed (503)')
  })
})

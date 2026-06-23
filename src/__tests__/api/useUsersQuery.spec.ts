import { renderHook, waitFor } from '@testing-library/react'
import { useUsersQuery } from '@/api/queries'
import { createQueryWrapper, mockFetch } from '../helpers/test-utils'

describe('useUsersQuery', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('fetches users and strips tokens', async () => {
    mockFetch(
      jest.fn().mockResolvedValue({
        ok: true,
        json: async () => [{ id: 2, nickname: 'Jeremie', token: 'secret' }],
      } as Response)
    )

    const { Wrapper } = createQueryWrapper()
    const { result } = renderHook(() => useUsersQuery(), { wrapper: Wrapper })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.data).toEqual([{ id: 2, nickname: 'Jeremie' }])
  })

  it('surfaces fetch errors', async () => {
    mockFetch(
      jest.fn().mockResolvedValue({
        ok: false,
        status: 503,
        json: async () => ({}),
      } as Response)
    )

    const { Wrapper } = createQueryWrapper()
    const { result } = renderHook(() => useUsersQuery(), { wrapper: Wrapper })

    await waitFor(() => expect(result.current.isError).toBe(true))

    expect(result.current.error).toEqual(new Error('Request failed (503)'))
  })
})

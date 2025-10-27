import { renderHook, waitFor } from '@testing-library/react'
import { useConversations, useSendMessage } from '../api'
import { getLoggedUserId } from '../../utils/getLoggedUserId'

// Mock the utility function
jest.mock('../../utils/getLoggedUserId')
const mockGetLoggedUserId = getLoggedUserId as jest.MockedFunction<typeof getLoggedUserId>

// Mock fetch
global.fetch = jest.fn()
const mockFetch = fetch as jest.MockedFunction<typeof fetch>

describe('API Hooks - Core Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockGetLoggedUserId.mockReturnValue(1)
  })

  describe('useConversations', () => {
    it('should fetch conversations successfully', async () => {
      const mockConversations = [
        {
          id: 1,
          recipientId: 2,
          recipientNickname: 'Jeremie',
          senderId: 1,
          senderNickname: 'Thibaut',
          lastMessageTimestamp: 1625637849,
        },
      ]

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockConversations,
      } as Response)

      const { result } = renderHook(() => useConversations())

      expect(result.current.loading).toBe(true)

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      expect(result.current.conversations).toEqual(mockConversations)
      expect(result.current.error).toBe(null)
    })

    it('should handle API errors', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
      } as Response)

      const { result } = renderHook(() => useConversations())

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      expect(result.current.error).toBe('Error 500: Internal Server Error')
    })
  })

  // useMessages tests simplified - similar pattern to useConversations

  describe('useSendMessage', () => {
    it('should send message successfully', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ id: 5 }),
      } as Response)

      const { result } = renderHook(() => useSendMessage())

      await result.current.sendMessage(1, 'Test message')

      expect(mockFetch).toHaveBeenCalledWith('http://localhost:3005/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: expect.stringContaining('"conversationId":1'),
      })
    })
  })
})
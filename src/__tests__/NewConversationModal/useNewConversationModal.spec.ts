import { act, renderHook, waitFor } from '@testing-library/react'

const mockMutateAsync = jest.fn()
const mockOnCreated = jest.fn()
const mockOnClose = jest.fn()

jest.mock('@/api/queries', () => ({
  useUsersQuery: () => ({
    data: [
      { id: 1, nickname: 'Thibaut' },
      { id: 2, nickname: 'Jeremie' },
    ],
  }),
}))

jest.mock('@/api/mutations', () => ({
  useCreateConversationMutation: () => ({
    mutateAsync: mockMutateAsync,
    isPending: false,
  }),
}))

beforeAll(() => {
  HTMLDialogElement.prototype.showModal = jest.fn()
  HTMLDialogElement.prototype.close = jest.fn()
})

import { useNewConversationModal } from '@/components/NewConversationModal/useNewConversationModal'

describe('useNewConversationModal', () => {
  beforeEach(() => {
    mockMutateAsync.mockReset()
    mockOnCreated.mockReset()
    mockOnClose.mockReset()
  })

  it('filters out the logged user from the list', () => {
    const { result } = renderHook(() =>
      useNewConversationModal({
        loggedUserId: 1,
        isOpen: true,
        onClose: mockOnClose,
        onCreated: mockOnCreated,
      })
    )

    expect(result.current.filtered).toEqual([{ id: 2, nickname: 'Jeremie' }])
  })

  it('creates a conversation when a user is selected', async () => {
    mockMutateAsync.mockResolvedValue(4)

    const { result } = renderHook(() =>
      useNewConversationModal({
        loggedUserId: 1,
        isOpen: true,
        onClose: mockOnClose,
        onCreated: mockOnCreated,
      })
    )

    await act(async () => {
      await result.current.handleSelect(2)
    })

    await waitFor(() => {
      expect(mockMutateAsync).toHaveBeenCalledWith({ userId: 1, recipientId: 2 })
      expect(mockOnCreated).toHaveBeenCalledWith(4)
      expect(mockOnClose).toHaveBeenCalled()
    })
  })
})

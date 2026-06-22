import { fireEvent, render, screen } from '@testing-library/react'

const mockSetQuery = jest.fn()
const mockHandleSelect = jest.fn()

const defaultHookState = {
  dialogRef: { current: null },
  query: '',
  setQuery: mockSetQuery,
  error: null as string | null,
  filtered: [{ id: 2, nickname: 'Jeremie' }],
  isPending: false,
  handleSelect: mockHandleSelect,
}

let hookState = { ...defaultHookState }

jest.mock('../components/NewConversationModal/useNewConversationModal', () => ({
  useNewConversationModal: () => hookState,
}))

import { NewConversationModal } from '../components/NewConversationModal/NewConversationModal'

describe('NewConversationModal', () => {
  beforeEach(() => {
    hookState = { ...defaultHookState }
    mockSetQuery.mockReset()
    mockHandleSelect.mockReset()
  })

  it('does not render when closed', () => {
    render(
      <NewConversationModal
        loggedUserId={1}
        isOpen={false}
        onClose={jest.fn()}
        onCreated={jest.fn()}
      />
    )

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('renders users and search input when open', () => {
    render(
      <NewConversationModal loggedUserId={1} isOpen onClose={jest.fn()} onCreated={jest.fn()} />
    )

    expect(screen.getByRole('dialog', { hidden: true })).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/search for a user/i)).toBeInTheDocument()
    expect(screen.getByText('Jeremie')).toBeInTheDocument()
  })

  it('updates the search query', () => {
    render(
      <NewConversationModal loggedUserId={1} isOpen onClose={jest.fn()} onCreated={jest.fn()} />
    )

    fireEvent.change(screen.getByPlaceholderText(/search for a user/i), {
      target: { value: 'jer' },
    })

    expect(mockSetQuery).toHaveBeenCalledWith('jer')
  })

  it('starts a conversation when a user is selected', () => {
    render(
      <NewConversationModal loggedUserId={1} isOpen onClose={jest.fn()} onCreated={jest.fn()} />
    )

    fireEvent.click(screen.getByRole('option', { name: /jeremie/i, hidden: true }))

    expect(mockHandleSelect).toHaveBeenCalledWith(2)
  })

  it('shows an error message when creation fails', () => {
    hookState = {
      ...defaultHookState,
      error: 'Unable to create the conversation. Please try again.',
      filtered: [],
    }

    render(
      <NewConversationModal loggedUserId={1} isOpen onClose={jest.fn()} onCreated={jest.fn()} />
    )

    expect(screen.getByText(/unable to create the conversation/i)).toBeInTheDocument()
    expect(screen.getByText(/no users found/i)).toBeInTheDocument()
  })
})

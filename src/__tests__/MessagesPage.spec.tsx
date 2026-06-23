import { fireEvent, render, screen } from '@testing-library/react'
import type { Conversation } from '@/types'

const conversation: Conversation = {
  id: 1,
  senderId: 1,
  senderNickname: 'Thibaut',
  recipientId: 2,
  recipientNickname: 'Jeremie',
  lastMessageTimestamp: 1625637849,
}

const mockSetIsModalOpen = jest.fn()
const mockHandleSelect = jest.fn()
const mockHandleBack = jest.fn()
const mockHandleCreated = jest.fn()

const defaultHookState = {
  loggedUserId: 1,
  selectedId: null as number | null,
  selectedConversation: null as Conversation | null,
  isModalOpen: false,
  setIsModalOpen: mockSetIsModalOpen,
  isDesktop: false,
  showList: true,
  showThread: false,
  contactName: '',
  handleSelect: mockHandleSelect,
  handleBack: mockHandleBack,
  handleCreated: mockHandleCreated,
}

let hookState = { ...defaultHookState }

jest.mock('../components/MessagesPage/useMessagesPage', () => ({
  useMessagesPage: () => hookState,
}))

jest.mock('../components/ConversationList/ConversationList', () => ({
  ConversationList: () => <div data-testid="conversation-list">Conversation list</div>,
}))

jest.mock('../components/MessageThread/MessageThread', () => ({
  MessageThread: ({ onBack }: { onBack?: () => void }) => (
    <div data-testid="message-thread">
      Message thread
      {onBack && (
        <button type="button" onClick={onBack}>
          Back
        </button>
      )}
    </div>
  ),
}))

jest.mock('../components/NewConversationModal/NewConversationModal', () => ({
  NewConversationModal: ({ isOpen }: { isOpen: boolean }) =>
    isOpen ? <div data-testid="new-conversation-modal">New conversation modal</div> : null,
}))

import { MessagesPage } from '../components/MessagesPage/MessagesPage'

describe('MessagesPage', () => {
  beforeEach(() => {
    hookState = { ...defaultHookState }
    mockSetIsModalOpen.mockReset()
    mockHandleBack.mockReset()
  })

  it('renders the conversation list on mobile', () => {
    render(<MessagesPage />)

    expect(screen.getByTestId('conversation-list')).toBeInTheDocument()
    expect(screen.queryByTestId('message-thread')).not.toBeInTheDocument()
  })

  it('renders the thread on mobile when a conversation is selected', () => {
    hookState = {
      ...defaultHookState,
      selectedId: 1,
      selectedConversation: conversation,
      showList: false,
      showThread: true,
      contactName: 'Jeremie',
    }

    render(<MessagesPage />)

    expect(screen.getByTestId('message-thread')).toBeInTheDocument()
  })

  it('shows the desktop empty state when nothing is selected', () => {
    hookState = {
      ...defaultHookState,
      isDesktop: true,
      showList: true,
    }

    render(<MessagesPage />)

    expect(screen.getByText(/select a conversation to get started/i)).toBeInTheDocument()
  })

  it('opens the new conversation modal', () => {
    hookState = {
      ...defaultHookState,
      isModalOpen: true,
    }

    render(<MessagesPage />)

    expect(screen.getByTestId('new-conversation-modal')).toBeInTheDocument()
  })

  it('passes a back handler to the thread on mobile', () => {
    hookState = {
      ...defaultHookState,
      selectedId: 1,
      selectedConversation: conversation,
      showList: false,
      showThread: true,
      contactName: 'Jeremie',
    }

    render(<MessagesPage />)

    fireEvent.click(screen.getByRole('button', { name: /back/i }))

    expect(mockHandleBack).toHaveBeenCalled()
  })
})

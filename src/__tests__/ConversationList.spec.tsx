import { render, screen } from '@testing-library/react'
import { ConversationList } from '../components/ConversationList'
import type { Conversation } from '@/types'

const conversations: Conversation[] = [
  {
    id: 1,
    senderId: 1,
    senderNickname: 'Thibaut',
    recipientId: 2,
    recipientNickname: 'Jeremie',
    lastMessageTimestamp: 1625637849,
  },
]

jest.mock('../components/ConversationList/useConversationList', () => ({
  useConversationList: () => ({
    items: conversations.map((conversation) => ({
      conversation,
      contactNickname: 'Jeremie',
      contactId: 2,
      isSelected: false,
    })),
    isLoading: false,
    error: null,
    onSelect: jest.fn(),
    onRetry: jest.fn(),
    onNewConversation: jest.fn(),
  }),
}))

describe('ConversationList', () => {
  it('renders conversation items', () => {
    render(
      <ConversationList
        loggedUserId={1}
        selectedId={null}
        onSelect={jest.fn()}
        onNewConversation={jest.fn()}
      />
    )

    expect(screen.getByText('Jeremie')).toBeInTheDocument()
    expect(screen.getByRole('listbox')).toBeInTheDocument()
  })

  it('shows empty state', () => {
    jest.requireMock('../components/ConversationList/useConversationList').useConversationList =
      () => ({
        items: [],
        isLoading: false,
        error: null,
        onSelect: jest.fn(),
        onRetry: jest.fn(),
        onNewConversation: jest.fn(),
      })

    render(
      <ConversationList
        loggedUserId={1}
        selectedId={null}
        onSelect={jest.fn()}
        onNewConversation={jest.fn()}
      />
    )

    expect(screen.getByText(/no conversations yet/i)).toBeInTheDocument()
  })
})

import { render, screen } from '@testing-library/react'
import { MessageThread } from '../components/MessageThread'
import type { Conversation } from '@/types'

jest.mock('../components/MessageThread/useMessageThread', () => ({
  useMessageThread: ({ loggedUserId }: { loggedUserId: number }) => ({
    sortedMessages: [],
    lastTimestamp: 1625637849,
    hasAccess: loggedUserId !== 99,
    error: null,
    isLoading: false,
    bottomRef: { current: null },
    handleSend: jest.fn(),
    onRetry: jest.fn(),
    isInputDisabled: false,
  }),
}))

beforeAll(() => {
  Element.prototype.scrollIntoView = jest.fn()
})

const conversation: Conversation = {
  id: 1,
  senderId: 1,
  senderNickname: 'Thibaut',
  recipientId: 2,
  recipientNickname: 'Jeremie',
  lastMessageTimestamp: 1625637849,
}

describe('MessageThread', () => {
  it('denies access to unauthorized users', () => {
    render(
      <MessageThread
        conversation={conversation}
        loggedUserId={99}
        contactName="Jeremie"
        authorName="Jeremie"
      />
    )

    expect(screen.getByRole('alert')).toHaveTextContent(/don't have access/i)
  })

  it('renders thread for authorized users', () => {
    render(
      <MessageThread
        conversation={conversation}
        loggedUserId={1}
        contactName="Jeremie"
        authorName="Jeremie"
      />
    )

    expect(screen.getByText(/Jeremie - You/)).toBeInTheDocument()
    expect(screen.getByLabelText('Send a message')).toBeInTheDocument()
  })
})

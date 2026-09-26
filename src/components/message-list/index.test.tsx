import { fireEvent, render, screen } from '@testing-library/react'
import MessageList from '.'
import type { Message } from '@/types/message'

const messages: Message[] = [
  {
    id: 1,
    conversationId: 1,
    authorId: 1,
    timestamp: new Date(2026, 8, 23, 9, 0).getTime(),
    body: 'Message from me',
  },
  {
    id: 2,
    conversationId: 1,
    authorId: 2,
    timestamp: new Date(2026, 8, 23, 9, 5).getTime(),
    body: 'Message from the counterpart',
  },
]

function renderList(
  overrides: Partial<Parameters<typeof MessageList>[0]> = {}
) {
  const props = {
    messages,
    status: 'success' as const,
    error: null,
    counterpartNickname: 'Jeremie',
    currentUserId: 1,
    onRetry: jest.fn(),
    ...overrides,
  }
  render(<MessageList {...props} />)
  return props
}

describe('MessageList', () => {
  it('renders every message body as text', () => {
    renderList()
    expect(screen.getByText('Message from me')).toBeInTheDocument()
    expect(
      screen.getByText('Message from the counterpart')
    ).toBeInTheDocument()
  })

  it('labels received messages with the author name and leaves own messages unlabelled', () => {
    renderList()
    const authorLabels = screen.getAllByText('Jeremie')
    // Exactly one label: for the single received message.
    expect(authorLabels).toHaveLength(1)
  })

  it('renders messages in the given (already sorted) order', () => {
    renderList()
    const bodies = screen.getAllByRole('listitem')
    expect(bodies[0]).toHaveTextContent('Message from me')
    expect(bodies[1]).toHaveTextContent('Message from the counterpart')
  })

  it('shows a friendly empty state for a conversation without messages', () => {
    renderList({ messages: [] })
    expect(
      screen.getByText('No messages yet. Say hello to Jeremie!')
    ).toBeInTheDocument()
  })

  it('shows a scoped retryable error when loading failed', () => {
    const props = renderList({
      status: 'error',
      error: 'Cannot reach the messaging service.',
    })
    expect(screen.getByRole('alert')).toHaveTextContent(
      'Cannot reach the messaging service.'
    )
    expect(screen.queryByText('Message from me')).not.toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Retry' }))
    expect(props.onRetry).toHaveBeenCalledTimes(1)
  })

  it('exposes a loading state', () => {
    renderList({ status: 'loading', messages: [] })
    expect(screen.getByText('Loading messages…')).toBeInTheDocument()
  })
})

import { fireEvent, render, screen, within } from '@testing-library/react'
import ConversationList from '.'
import type { Conversation } from '@/types/conversation'

const conversations: Conversation[] = [
  {
    id: 3,
    senderId: 4,
    senderNickname: 'Elodie',
    recipientId: 1,
    recipientNickname: 'Thibaut',
    lastMessageTimestamp: new Date(2026, 8, 23, 10, 0).getTime(),
  },
  {
    id: 1,
    senderId: 1,
    senderNickname: 'Thibaut',
    recipientId: 2,
    recipientNickname: 'Jeremie',
    lastMessageTimestamp: new Date(2026, 8, 20, 10, 0).getTime(),
  },
]

function renderList(
  overrides: Partial<Parameters<typeof ConversationList>[0]> = {}
) {
  const props = {
    conversations,
    status: 'success' as const,
    error: null,
    selectedConversationId: null,
    currentUserId: 1,
    onSelect: jest.fn(),
    onRetry: jest.fn(),
    onCreate: jest.fn(),
    ...overrides,
  }
  render(<ConversationList {...props} />)
  return props
}

describe('ConversationList', () => {
  it('renders one button per conversation labelled with the counterpart nickname', () => {
    renderList()
    const items = screen.getAllByRole('listitem')
    expect(items).toHaveLength(2)
    expect(
      within(items[0] as HTMLElement).getByRole('button', { name: /Elodie/ })
    ).toBeInTheDocument()
    expect(
      within(items[1] as HTMLElement).getByRole('button', { name: /Jeremie/ })
    ).toBeInTheDocument()
  })

  it('marks the selected conversation with aria-current', () => {
    renderList({ selectedConversationId: 3 })
    const selected = screen.getByRole('button', { name: /Elodie/ })
    expect(selected).toHaveAttribute('aria-current', 'true')
    expect(
      screen.getByRole('button', { name: /Jeremie/ })
    ).not.toHaveAttribute('aria-current')
  })

  it('calls onSelect with the conversation id on click', () => {
    const props = renderList()
    fireEvent.click(screen.getByRole('button', { name: /Jeremie/ }))
    expect(props.onSelect).toHaveBeenCalledWith(1)
  })

  it('shows a retryable error instead of the list when loading failed', () => {
    const props = renderList({
      conversations: [],
      status: 'error',
      error: 'Service unavailable.',
    })
    expect(screen.getByRole('alert')).toHaveTextContent('Service unavailable.')
    expect(screen.queryByRole('listitem')).not.toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Retry' }))
    expect(props.onRetry).toHaveBeenCalledTimes(1)
  })

  it('exposes a loading state', () => {
    renderList({ conversations: [], status: 'loading' })
    expect(screen.getByText('Loading conversations')).toBeInTheDocument()
  })

  it('shows an empty state when the user has no conversation', () => {
    renderList({ conversations: [], status: 'success' })
    expect(screen.getByText('No conversations yet.')).toBeInTheDocument()
  })

  it('opens the creation flow from the New button', () => {
    const props = renderList()
    fireEvent.click(screen.getByRole('button', { name: /New/ }))
    expect(props.onCreate).toHaveBeenCalledTimes(1)
  })
})

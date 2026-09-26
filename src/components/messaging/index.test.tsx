import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import Messaging from '.'
import { API_BASE_URL } from '@api/http'
import { deferred, installFetchStub, postedBody } from '@/test/stubApi'

/**
 * Integration tests for the messaging screen, wired to a stubbed API shaped
 * exactly like the supplied json-server fixtures (Unix-second timestamps).
 */
const conversationsFixture = [
  {
    id: 1,
    recipientId: 2,
    recipientNickname: 'Jeremie',
    senderId: 1,
    senderNickname: 'Thibaut',
    lastMessageTimestamp: 1625637849,
  },
  {
    id: 2,
    recipientId: 3,
    recipientNickname: 'Patrick',
    senderId: 1,
    senderNickname: 'Thibaut',
    lastMessageTimestamp: 1620284667,
  },
  {
    id: 3,
    recipientId: 1,
    recipientNickname: 'Thibaut',
    senderId: 4,
    senderNickname: 'Elodie',
    lastMessageTimestamp: 1625648667,
  },
]

const messagesFixture = {
  1: [
    { id: 1, conversationId: 1, timestamp: 1625637849, authorId: 1, body: 'Premier message (moi)' },
    { id: 2, conversationId: 1, timestamp: 1625637867, authorId: 1, body: 'Second message (moi)' },
    { id: 3, conversationId: 1, timestamp: 1625648667, authorId: 2, body: 'Troisieme message (Jeremie)' },
  ],
  2: [
    { id: 4, conversationId: 2, timestamp: 1620284667, authorId: 2, body: 'Message de la seconde conversation' },
  ],
  3: [],
}

function url(path: string): string {
  return `${API_BASE_URL}${path}`
}

function setupRoutes(overrides: Record<string, unknown> = {}): void {
  installFetchStub({
    [url('/conversations/1')]: conversationsFixture,
    [url('/messages/1')]: messagesFixture[1],
    [url('/messages/2')]: messagesFixture[2],
    [url('/messages/3')]: messagesFixture[3],
    ...overrides,
  })
}

function openConversation(name: string): void {
  fireEvent.click(screen.getByRole('button', { name: new RegExp(name) }))
}

describe('Messaging screen', () => {
  it('lists the conversations of the logged user, most recent first', async () => {
    setupRoutes()
    render(<Messaging />)

    const items = await screen.findAllByRole('listitem')
    const labels = items.map(
      (item) => within(item).getByRole('button').textContent
    )
    expect(labels[0]).toContain('Elodie')
    expect(labels[1]).toContain('Jeremie')
    expect(labels[2]).toContain('Patrick')
  })

  it('loads a conversation lazily on selection and marks message ownership', async () => {
    setupRoutes()
    render(<Messaging />)

    await screen.findAllByRole('listitem')
    openConversation('Jeremie')

    expect(
      await screen.findByText('Troisieme message (Jeremie)')
    ).toBeInTheDocument()
    // Own messages carry no author label; received ones are labelled with
    // the counterpart nickname — direction is derived, never assumed.
    // (Scoped to the message log: "Jeremie" also appears in the inbox and
    // the conversation header.)
    const messageLog = screen.getByRole('log')
    expect(within(messageLog).getAllByText('Jeremie')).toHaveLength(1)

    const inbox = screen.getByRole('region', { name: 'Conversations' })
    expect(
      within(inbox).getByRole('button', { name: /Jeremie/ })
    ).toHaveAttribute('aria-current', 'true')
  })

  it('supports the recipient-side conversation (fixture #3, no messages yet)', async () => {
    setupRoutes()
    render(<Messaging />)

    await screen.findAllByRole('listitem')
    openConversation('Elodie')

    expect(
      await screen.findByText('No messages yet. Say hello to Elodie!')
    ).toBeInTheDocument()
  })

  it('sends a message, appends the confirmation and refreshes list ordering', async () => {
    // POST and GET share the URL /messages/1 — route by method.
    installFetchStub({
      [url('/conversations/1')]: conversationsFixture,
      [url('/messages/1')]: (_: unknown, init?: RequestInit) =>
        init?.method === 'POST'
          ? { status: 201, body: { body: 'Nouveau message', timestamp: 1790000000, id: 99 } }
          : messagesFixture[1],
      [url('/messages/2')]: messagesFixture[2],
      [url('/messages/3')]: messagesFixture[3],
    })

    render(<Messaging />)
    await screen.findAllByRole('listitem')
    openConversation('Jeremie')
    await screen.findByText('Premier message (moi)')

    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'Nouveau message' } })
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Send message to Jeremie' }))
    })

    const sendCall = (global.fetch as jest.Mock).mock.calls.find(
      (call) => (call[1] as RequestInit | undefined)?.method === 'POST'
    )
    expect(sendCall?.[0]).toBe(url('/messages/1'))
    const body = postedBody(sendCall?.[1])
    expect(body).toMatchObject({
      conversationId: 1,
      authorId: 1,
      body: 'Nouveau message',
    })
    expect(typeof (body as { timestamp: number }).timestamp).toBe('number')

    expect(await screen.findByText('Nouveau message')).toBeInTheDocument()
    await waitFor(() => {
      expect(screen.getByRole('textbox')).toHaveValue('')
    })
    // The conversation just messaged becomes the most recent one.
    await waitFor(() => {
      const firstItem = screen.getAllByRole('listitem')[0]
      expect(within(firstItem).getByRole('button').textContent).toContain('Jeremie')
    })
  })

  it('preserves the draft and shows an alert when sending fails', async () => {
    installFetchStub({
      [url('/conversations/1')]: conversationsFixture,
      // POST fails with a server error; GET returns the history.
      [url('/messages/1')]: (_: unknown, init?: RequestInit) =>
        init?.method === 'POST'
          ? { status: 500, body: {} }
          : messagesFixture[1],
      [url('/messages/2')]: messagesFixture[2],
      [url('/messages/3')]: messagesFixture[3],
    })

    render(<Messaging />)
    await screen.findAllByRole('listitem')
    openConversation('Jeremie')
    await screen.findByText('Premier message (moi)')

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Brouillon precieux' } })
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Send message to Jeremie' }))
    })

    expect(screen.getByRole('alert')).toHaveTextContent('could not be sent')
    expect(screen.getByRole('textbox')).toHaveValue('Brouillon precieux')
    // Only one POST attempt — the app never auto-retries a message send.
    const postCalls = (global.fetch as jest.Mock).mock.calls.filter(
      (call) => (call[1] as RequestInit | undefined)?.method === 'POST'
    )
    expect(postCalls).toHaveLength(1)
  })

  it('ignores a late response arriving after a fast conversation switch', async () => {
    const slowConversation1 = deferred<typeof messagesFixture[1]>()
    installFetchStub({
      [url('/conversations/1')]: conversationsFixture,
      [url('/messages/1')]: () => slowConversation1.promise,
      [url('/messages/2')]: messagesFixture[2],
      [url('/messages/3')]: messagesFixture[3],
    })

    render(<Messaging />)
    await screen.findAllByRole('listitem')

    openConversation('Jeremie')
    expect(screen.getByText('Loading messages…')).toBeInTheDocument()

    openConversation('Patrick')
    expect(
      await screen.findByText('Message de la seconde conversation')
    ).toBeInTheDocument()

    // The slow response for conversation 1 resolves last: it must not
    // overwrite what is displayed for conversation 2.
    await act(async () => {
      slowConversation1.resolve(messagesFixture[1])
    })
    expect(
      screen.getByText('Message de la seconde conversation')
    ).toBeInTheDocument()
    expect(screen.queryByText('Premier message (moi)')).not.toBeInTheDocument()
  })

  it('recovers from a conversation-list failure with an explicit retry', async () => {
    let listCalls = 0
    installFetchStub({
      [url('/conversations/1')]: () => {
        listCalls += 1
        return listCalls === 1
          ? { status: 503, body: {} }
          : conversationsFixture
      },
      [url('/messages/1')]: messagesFixture[1],
    })

    render(<Messaging />)

    const alert = await screen.findByRole('alert')
    expect(alert).toHaveTextContent('temporarily unavailable')

    fireEvent.click(screen.getByRole('button', { name: 'Retry' }))
    expect(await screen.findAllByRole('listitem')).toHaveLength(3)
  })

  it('scopes a message-loading failure to the conversation pane', async () => {
    let messageCalls = 0
    installFetchStub({
      [url('/conversations/1')]: conversationsFixture,
      [url('/messages/1')]: () => {
        messageCalls += 1
        return messageCalls === 1
          ? { status: 500, body: {} }
          : messagesFixture[1]
      },
    })

    render(<Messaging />)
    await screen.findAllByRole('listitem')

    openConversation('Jeremie')
    expect(await screen.findByRole('alert')).toHaveTextContent(
      'temporarily unavailable'
    )
    // The rest of the application is untouched.
    expect(screen.getAllByRole('listitem')).toHaveLength(3)

    fireEvent.click(screen.getByRole('button', { name: 'Retry' }))
    expect(
      await screen.findByText('Premier message (moi)')
    ).toBeInTheDocument()
  })

  it('returns to the list on back navigation and restores focus to the conversation', async () => {
    setupRoutes()
    render(<Messaging />)

    await screen.findAllByRole('listitem')
    openConversation('Jeremie')
    await screen.findByText('Premier message (moi)')

    expect(document.querySelector('main[data-view]')).toHaveAttribute(
      'data-view',
      'conversation'
    )

    fireEvent.click(screen.getByRole('button', { name: 'Back to conversations' }))
    expect(document.querySelector('main[data-view]')).toHaveAttribute(
      'data-view',
      'list'
    )
    await waitFor(() => {
      expect(document.activeElement?.id).toBe('conversation-1')
    })
  })

  it('reuses the cached history instead of refetching when revisiting a conversation', async () => {
    setupRoutes()
    render(<Messaging />)

    await screen.findAllByRole('listitem')
    openConversation('Jeremie')
    await screen.findByText('Premier message (moi)')

    openConversation('Patrick')
    await screen.findByText('Message de la seconde conversation')

    // Return to the first conversation: its messages come back instantly
    // from the per-conversation cache — no second network request.
    openConversation('Jeremie')
    expect(
      await screen.findByText('Premier message (moi)')
    ).toBeInTheDocument()

    const messagesForOne = (global.fetch as jest.Mock).mock.calls.filter(
      (call) => call[0] === url('/messages/1')
    )
    expect(messagesForOne).toHaveLength(1)
  })
})

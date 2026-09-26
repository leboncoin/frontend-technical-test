import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import NewConversationDialog from '.'
import { API_BASE_URL } from '@api/http'
import { installFetchStub } from '@/test/stubApi'

const usersFixture = [
  { id: 1, nickname: 'Thibaut', token: 'xxxx' },
  { id: 2, nickname: 'Jeremie', token: 'xxxx' },
  { id: 4, nickname: 'Elodie', token: 'xxxx' },
]

function setupDialog(
  createResponse: unknown = { status: 201, body: { id: 9 } }
) {
  const onCreated = jest.fn()
  const onClose = jest.fn()

  installFetchStub({
    [`${API_BASE_URL}/users`]: usersFixture,
    [`${API_BASE_URL}/conversations/1`]: (_: string, init?: RequestInit) =>
      init?.method === 'POST' ? createResponse : { status: 500, body: {} },
  })

  render(
    <NewConversationDialog
      currentUserId={1}
      onCreated={onCreated}
      onClose={onClose}
    />
  )
  return { onCreated, onClose }
}

describe('NewConversationDialog (Bonus 1)', () => {
  it('lists available recipients and never offers the logged-in user', async () => {
    setupDialog()
    const select = await screen.findByLabelText(/Start a conversation with/)
    const options = Array.from(select.querySelectorAll('option')).map(
      (option) => option.textContent
    )
    expect(options).toEqual(['Choose a recipient…', 'Jeremie', 'Elodie'])
  })

  it('keeps Create disabled until a recipient is chosen', async () => {
    setupDialog()
    await screen.findByLabelText(/Start a conversation with/)
    expect(screen.getByRole('button', { name: 'Create' })).toBeDisabled()
  })

  it('creates the conversation from the POST response and hands it back', async () => {
    const { onCreated } = setupDialog({ status: 201, body: { id: 9 } })
    fireEvent.change(
      await screen.findByLabelText(/Start a conversation with/),
      {
        target: { value: '2' },
      }
    )
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Create' }))
    })

    await waitFor(() => expect(onCreated).toHaveBeenCalledTimes(1))
    const conversation = onCreated.mock.calls[0][0]
    // Locally-completed shape: json-server does not echo the full entity
    // contract, so the client fills sender/recipient fields it already knows.
    expect(conversation).toMatchObject({
      id: 9,
      senderId: 1,
      senderNickname: 'Thibaut',
      recipientId: 2,
      recipientNickname: 'Jeremie',
    })
    expect(typeof conversation.lastMessageTimestamp).toBe('number')
  })

  it('keeps the dialog open with a safe error when creation fails', async () => {
    setupDialog({ status: 500, body: {} })
    fireEvent.change(
      await screen.findByLabelText(/Start a conversation with/),
      {
        target: { value: '4' },
      }
    )
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Create' }))
    })

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'temporarily unavailable'
    )
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('closes on Escape', async () => {
    const { onClose } = setupDialog()
    const dialog = await screen.findByRole('dialog')
    fireEvent.keyDown(dialog, { key: 'Escape' })
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('traps Tab focus inside the dialog', async () => {
    setupDialog()
    fireEvent.change(
      await screen.findByLabelText(/Start a conversation with/),
      {
        target: { value: '2' },
      }
    )
    // Focus the last control (Create, now enabled), then Tab: focus must
    // wrap around to the first focusable control (the Close button).
    const createButton = screen.getByRole('button', { name: 'Create' })
    createButton.focus()
    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Tab' })
    await waitFor(() => {
      expect(document.activeElement?.getAttribute('aria-label')).toBe('Close')
    })
    fireEvent.keyDown(screen.getByRole('dialog'), {
      key: 'Tab',
      shiftKey: true,
    })
    await waitFor(() => {
      expect(document.activeElement).toBe(createButton)
    })
  })
})

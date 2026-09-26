import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import MessageComposer from '.'
import { deferred } from '@/test/stubApi'

function renderComposer(
  onSend: (text: string) => Promise<boolean> = jest.fn().mockResolvedValue(true)
) {
  render(<MessageComposer onSend={onSend} counterpartNickname="Jeremie" />)
  return { onSend }
}

function typeAndSubmit(text: string) {
  const input = screen.getByRole('textbox')
  fireEvent.change(input, { target: { value: text } })
  fireEvent.click(
    screen.getByRole('button', { name: 'Send message to Jeremie' })
  )
}

describe('MessageComposer', () => {
  it('keeps Send disabled while the draft is empty or whitespace-only', () => {
    renderComposer()
    const send = screen.getByRole('button', {
      name: 'Send message to Jeremie',
    })
    expect(send).toBeDisabled()

    fireEvent.change(screen.getByRole('textbox'), { target: { value: '   ' } })
    expect(send).toBeDisabled()
  })

  it('sends the trimmed text and clears the composer on confirmed success', async () => {
    const onSend = jest.fn().mockResolvedValue(true)
    renderComposer(onSend)

    await act(async () => {
      typeAndSubmit('  Hello!  ')
    })

    expect(onSend).toHaveBeenCalledWith('Hello!')
    await waitFor(() => {
      expect(screen.getByRole('textbox')).toHaveValue('')
    })
  })

  it('preserves the draft and explains the failure when sending fails', async () => {
    const onSend = jest.fn().mockResolvedValue(false)
    renderComposer(onSend)

    await act(async () => {
      typeAndSubmit('Important draft')
    })

    expect(onSend).toHaveBeenCalledWith('Important draft')
    expect(screen.getByRole('alert')).toHaveTextContent('could not be sent')
    expect(screen.getByRole('textbox')).toHaveValue('Important draft')
  })

  it('prevents a second submit while the first is in flight', async () => {
    const gate = deferred<boolean>()
    const onSend = jest.fn().mockReturnValue(gate.promise)
    renderComposer(onSend)

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'only once' },
    })
    const send = screen.getByRole('button', {
      name: 'Send message to Jeremie',
    })
    await act(async () => {
      fireEvent.click(send)
    })

    expect(onSend).toHaveBeenCalledTimes(1)
    expect(send).toBeDisabled()

    // A stray keyboard Enter must not trigger a second POST either.
    fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Enter' })
    expect(onSend).toHaveBeenCalledTimes(1)

    await act(async () => {
      gate.resolve(true)
    })
    await waitFor(() => {
      expect(screen.getByRole('textbox')).toHaveValue('')
    })
  })

  it('submits on Enter but not on Shift+Enter', async () => {
    const onSend = jest.fn().mockResolvedValue(true)
    renderComposer(onSend)

    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'With enter' } })
    await act(async () => {
      fireEvent.keyDown(input, { key: 'Enter' })
    })
    expect(onSend).toHaveBeenCalledWith('With enter')

    fireEvent.change(input, { target: { value: 'Shift enter' } })
    fireEvent.keyDown(input, { key: 'Enter', shiftKey: true })
    expect(onSend).toHaveBeenCalledTimes(1)
  })
})

import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import { MessageInput } from '../components/MessageInput'
import { resetRateLimiter } from '../lib/safety/rateLimiter'

describe('MessageInput', () => {
  beforeEach(() => {
    resetRateLimiter()
  })

  it('does not send empty messages', async () => {
    const onSend = jest.fn()
    render(<MessageInput conversationId={1} onSend={onSend} />)

    expect(screen.getByLabelText('Send')).toBeDisabled()
    expect(onSend).not.toHaveBeenCalled()
  })

  it('keeps send disabled for whitespace-only input', () => {
    const onSend = jest.fn()
    render(<MessageInput conversationId={1} onSend={onSend} />)

    fireEvent.change(screen.getByLabelText('Your message'), {
      target: { value: '   ' },
    })

    expect(screen.getByLabelText('Send')).toBeDisabled()
    expect(onSend).not.toHaveBeenCalled()
  })

  it('sends valid messages', async () => {
    jest.useFakeTimers()
    const onSend = jest.fn().mockResolvedValue(undefined)
    render(<MessageInput conversationId={1} onSend={onSend} />)

    fireEvent.change(screen.getByLabelText('Your message'), {
      target: { value: 'Bonjour' },
    })
    fireEvent.click(screen.getByLabelText('Send'))

    await act(async () => {
      jest.advanceTimersByTime(500)
    })

    await waitFor(() => {
      expect(onSend).toHaveBeenCalledWith('Bonjour')
    })
    jest.useRealTimers()
  })

  it('restores message on send failure', async () => {
    jest.useFakeTimers()
    const onSend = jest.fn().mockRejectedValue(new Error('fail'))
    render(<MessageInput conversationId={1} onSend={onSend} />)

    const input = screen.getByLabelText('Your message') as HTMLTextAreaElement
    fireEvent.change(input, { target: { value: 'Test' } })
    fireEvent.click(screen.getByLabelText('Send'))

    await act(async () => {
      jest.advanceTimersByTime(500)
    })

    await waitFor(() => {
      expect(input.value).toBe('Test')
      expect(screen.getByRole('alert')).toHaveTextContent(/failed to send/i)
    })
    jest.useRealTimers()
  })
})

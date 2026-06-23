import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { ErrorSnackbar } from '../components/ErrorSnackbar'

describe('ErrorSnackbar', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers()
    })
    jest.useRealTimers()
  })

  it('renders the bonus copy and message', async () => {
    render(<ErrorSnackbar message="We could not load your conversations." onRetry={jest.fn()} />)

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument()
    })
    expect(screen.getByText(/it's not you, it's me/i)).toBeInTheDocument()
    expect(screen.getByText(/could not load your conversations/i)).toBeInTheDocument()
  })

  it('retries immediately when the user clicks Retry now', async () => {
    const onRetry = jest.fn()

    render(<ErrorSnackbar message="Server unavailable." onRetry={onRetry} retryInMs={30_000} />)

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /retry now/i })).toBeInTheDocument()
    })

    fireEvent.click(screen.getByRole('button', { name: /retry now/i }))

    expect(onRetry).toHaveBeenCalledTimes(1)
  })

  it('auto-retries when the countdown reaches zero', async () => {
    const onRetry = jest.fn()

    render(<ErrorSnackbar message="Server unavailable." onRetry={onRetry} retryInMs={1_000} />)

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument()
    })

    act(() => {
      jest.advanceTimersByTime(1_000)
    })

    await waitFor(() => {
      expect(onRetry).toHaveBeenCalledTimes(1)
    })
  })

  it('can be dismissed', async () => {
    render(<ErrorSnackbar message="Server unavailable." onRetry={jest.fn()} />)

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /dismiss/i })).toBeInTheDocument()
    })

    fireEvent.click(screen.getByRole('button', { name: /dismiss/i }))

    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })
})

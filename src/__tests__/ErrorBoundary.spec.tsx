import { fireEvent, render, screen } from '@testing-library/react'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorFallback } from '@/components/ErrorFallback'

const CrashOnRender = () => {
  throw new Error('Render crash')
}

describe('ErrorBoundary integration', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('shows the fallback UI when a child component crashes', () => {
    render(
      <ErrorBoundary FallbackComponent={ErrorFallback} onReset={jest.fn()}>
        <CrashOnRender />
      </ErrorBoundary>
    )

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument()
    expect(screen.queryByText(/render crash/i)).not.toBeInTheDocument()
  })

  it('reloads the page when reset is triggered from the app boundary', () => {
    const reload = jest.fn()
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: { reload },
    })

    render(
      <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => window.location.reload()}>
        <CrashOnRender />
      </ErrorBoundary>
    )

    fireEvent.click(screen.getByRole('button', { name: /reload page/i }))

    expect(reload).toHaveBeenCalled()
  })
})

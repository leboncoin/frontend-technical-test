import { fireEvent, render, screen } from '@testing-library/react'
import { ErrorFallback } from '@/components/ErrorFallback'

describe('ErrorFallback', () => {
  it('renders the crash recovery screen', () => {
    render(<ErrorFallback error={new Error('Boom')} resetErrorBoundary={jest.fn()} />)

    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /reload page/i })).toBeInTheDocument()
  })

  it('calls resetErrorBoundary when reload is clicked', () => {
    const resetErrorBoundary = jest.fn()

    render(<ErrorFallback error={new Error('Boom')} resetErrorBoundary={resetErrorBoundary} />)

    fireEvent.click(screen.getByRole('button', { name: /reload page/i }))

    expect(resetErrorBoundary).toHaveBeenCalled()
  })
})

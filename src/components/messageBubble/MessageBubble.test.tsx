import { render, screen } from '@testing-library/react'

import { Default } from './MessageBubble.stories'

describe('MessageBubble', () => {
  it('Should display MessageBubble', () => {
    render(<Default {...Default.args} />)

    expect(screen.getByText(/hello/i)).toBeInTheDocument()
  })
})

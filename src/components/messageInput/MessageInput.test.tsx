import { render, screen } from '@testing-library/react'

import { Default } from './MessageInput.stories'

describe('MessageInput', () => {
  it('Should display MessageInput', () => {
    render(<Default {...Default.args} />)

    expect(
      screen.getByRole('button', {
        name: /submit/i,
      })
    ).toBeInTheDocument()

    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })
})

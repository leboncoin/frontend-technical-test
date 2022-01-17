import { render, screen } from '@testing-library/react'

import { Default } from './ConversationItem.stories'

describe('ConversationItem', () => {
  it('Should display ConversationItem', () => {
    render(<Default {...Default.args} />)

    expect(screen.getByText(/jean/i)).toBeInTheDocument()
  })
})

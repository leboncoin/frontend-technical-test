import { render, screen } from '@testing-library/react'

import { Default } from './CardUser.stories'

describe('CardUser', () => {
  it('Should display CardUser', () => {
    render(<Default {...Default.args} />)

    expect(screen.getByText(/john doe/i)).toBeInTheDocument()
  })
})

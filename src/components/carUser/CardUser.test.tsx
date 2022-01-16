import { render, screen } from '@testing-library/react'

import * as stories from './CardUser.stories'

describe('CardUser', () => {
  it('Should display CardUser', () => {
    render(<stories.Default />)

    expect(screen.getByText(/john doe/i)).toBeInTheDocument()
  })
})

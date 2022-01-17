import { render, screen } from '@testing-library/react'

import { Default, WithBackArrow } from './CustomAppBar.stories'

describe.only('CustomAppBar', () => {
  it('Should display CustomAppBar', () => {
    render(<Default {...Default.args} />)

    expect(screen.getByText(/My app bar/i)).toBeInTheDocument()
  })

  it('Should have a back arrow button', () => {
    render(<WithBackArrow {...WithBackArrow.args} />)

    expect(
      screen.getByRole('button', {
        name: /back/i,
      })
    ).toBeInTheDocument()
  })
})

import { render, waitFor } from '@testing-library/react'
import Home from '../pages'

const mockReplace = jest.fn()

jest.mock('next/router', () => ({
  useRouter: () => ({
    replace: mockReplace,
    isReady: true,
  }),
}))

describe('Home', () => {
  it('redirects to messages page', async () => {
    render(<Home />)
    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith('/messages')
    })
  })
})

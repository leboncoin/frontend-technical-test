import { render, screen } from '@testing-library/react'
import { userInfo } from 'os'
import App from '../pages'
import { StoreProvider } from '../store/store'

describe('App', () => {
  it('should render correctly App', () => {
    render(
      <StoreProvider>
        <App />
      </StoreProvider>
    )
    // expect(screen.getByText(/loading/)).toBeInTheDocument()
  })
})

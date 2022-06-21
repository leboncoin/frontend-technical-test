import { getByText, render, screen, waitFor } from '@testing-library/react'
import { List as Conversations} from './List'

describe('Conversations',  () => {
  it('renders no conversations', () => {
    render(<Conversations loggedUserId={0} />)
    expect(screen.getByText('No conversations to display')).toBeInTheDocument()
  })

  
  
  /*it('format & renders correctly conversations', async () => {

    render(<Conversations loggedUserId={1} />)

    await waitFor(() => {
        screen.getByText('Jeremie')
    })

    expect(screen.getByText('Jeremie')).toBeInTheDocument()

    
    expect(await screen.getByText('Patrick')).toBeInTheDocument()
    screen.debug();
    expect(await screen.getByText('Elodie')).toBeInTheDocument()
    screen.debug();

    expect(await screen.getAllByText('July 7, 2021 7:04 AM')).toBeInTheDocument()
    expect(await screen.getAllByText('May 6, 2021 7:04 AM')).toBeInTheDocument()
    expect(await screen.getAllByText('July 7, 2021 10:04 AM')).toBeInTheDocument()
  })*/
})
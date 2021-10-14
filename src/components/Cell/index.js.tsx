import { User } from '../../types/user' 
import { Container } from './Container.style'
export const CellDisplayUserName = (props) => {
  return(
    <Container>
      <p>{props.nickname}</p>
    </Container>
  )
}
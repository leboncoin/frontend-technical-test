import type { FC } from 'react'
import { ConversationComponent } from '../components/conversation'
import styles from '../styles/Home.module.css'
import { getLoggedUserId } from '../utils/getLoggedUserId'
const loggedUserId = getLoggedUserId() ;

const Home: FC = () => {
  return (
    <div className={styles.container}>
      <ConversationComponent loggedUserId={loggedUserId} />
    </div>
  )
}

export default Home
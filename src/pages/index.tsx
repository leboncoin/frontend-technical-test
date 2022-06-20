import type { FC } from 'react'
import { ConversationComponent } from '../components/conversation'
import styles from '../styles/Home.module.css'

const Home: FC = () => {
  return (
    <div className={styles.container}>
      <ConversationComponent/>
    </div>
  )
}

export default Home
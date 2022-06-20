import type { FC } from 'react'
import { MessageComponent } from '../../components/message'
import styles from '../../styles/Home.module.css'

const Conversation: FC = () => {
  return (
    <div className={styles.container}>
      <MessageComponent />
    </div>
  )
}



export default Conversation
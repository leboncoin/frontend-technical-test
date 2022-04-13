import type { FC } from 'react'
import ListConversations from '../components/ListConversations'
import HelloUser from '../components/HelloUser'
import styles from '../styles/Home.module.css'

const Home: FC = () => {
  const year = new Date().getFullYear()

  return (
    <div>
      <HelloUser />
      <ListConversations />

      <footer className={styles.footer}>
        &copy; leboncoin - {year}
      </footer>
    </div>
  )
}

export default Home
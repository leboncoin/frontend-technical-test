import type { FC } from 'react'
import { Card } from '../card/Card'
import styles from './list.module.css'

export const List : FC = () => {

  return (
    <div className={styles.conversationsList}>
        <div className={styles.container}>
            <Card />
        </div>
    </div>
  )
}
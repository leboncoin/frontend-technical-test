import React, { FC } from 'react'
import styles from './addMessage.module.css'

export const AddMessage : FC = () => {

  return (
      <div className={styles.send_message}>
        <form>
          <p className={styles.form_inside}>
            <input type="text" value=""/>
            <button className={styles.send} >Send</button>
          </p>
        </form>
      </div>
  )
}
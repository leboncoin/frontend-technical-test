import React, { useEffect, useState } from 'react'
import type { FC } from 'react'
import styles from './message.module.css'

export const Message : FC = () => {

  return (
    <div className={styles.card}>
        <div className={styles.name}>Abdo</div>
        <div className={styles.bubble}>
            Hello !
            <div className={styles.corner}></div>
        </div>
    </div>
  )
}

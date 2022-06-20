import React, { useEffect, useState } from 'react'
import type { FC } from 'react'
import { AddMessage } from '../addMessage/AddMessage'
import styles from './list.module.css'
import { Message } from '../message/Message'

export const List : FC = () => {
    return (
        <div className={styles.container}>
            <div className={styles.inside}>
                <div className={styles.head}>
                    <h2>Adil</h2>
                    <p>Last message today at <strong> 8:50 </strong></p>
                </div>
                <div className={styles.list}>
                    <Message />
                    <AddMessage />
                </div>
            </div>
        </div>
    )
}

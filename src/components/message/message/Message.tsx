import React, { useEffect, useState } from 'react'
import type { FC } from 'react'
import { Message as MessageType } from '../../../types/message'
import styles from './message.module.css'
import { useUser } from '../../../hooks/useUser'
import { User } from '../../../types/user'

interface MessageProps {
  message: MessageType
  me : User
}

export const Message : FC<MessageProps> = ({ message , me }) => {
  const [author,setAuthor] =  useState<User>({} as User);
  const {getUser} = useUser()

  useEffect(() =>{
    getAuthor(message.authorId)
  },[])

  const getAuthor = async (userId) => {
      let user = await getUser(userId)
      setAuthor(user)
  }

  const getClassMessage = (id) => {
    return id === message.authorId ? styles.message_left : styles.message_right
  }

  return (
    <div>
        <div className={getClassMessage(me?.id)}>
            <div className={styles.name}>{author.nickname}</div>
            <div className={styles.bubble}>
                {message.body}
                <div className={styles.corner}></div>
            </div>
        </div>
    </div>
  )
}


import type { FC } from 'react'
import styles from './card.module.css'
import Image from 'next/image'
import ProfileImg from '../../../assets/profile.png'
import Link from 'next/link'
import { Conversation } from '../../../types/conversation'

interface CardProps {
    conversation: Conversation
    loggedUserId: number
}  

export const Card : FC<CardProps> = ({ conversation, loggedUserId }) => {
  
    const getNickname = (conversation:Conversation,loggedUserId:number) => {
      return conversation.recipientId ===  loggedUserId ? conversation.senderNickname : conversation.recipientNickname;
    }
  
    return (
      <Link href={`/conversation/${conversation.id}`} >
        <div className={styles.card}>
            <Image src={ProfileImg} alt="" width={40} height={40}/>
            <div className={styles.details}>
                <span className={styles.contact}>{getNickname(conversation,loggedUserId)}</span>
                <span className={styles.date}>{conversation.lastMessageTimestamp}</span>
            </div>
        </div>
      </Link>
    )
  }
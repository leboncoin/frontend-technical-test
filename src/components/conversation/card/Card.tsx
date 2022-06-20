import type { FC } from 'react'
import styles from './card.module.css'
import Image from 'next/image'
import ProfileImg from '../../../assets/profile.png'

export const Card : FC = () => {
    return (
        <div>
            <div className={styles.card}>
                <Image src={ProfileImg} alt="" width={40} height={40}/>
                <div className={styles.details}>
                    <span className={styles.contact}>Abdo</span>
                    <span className={styles.date}>20 April</span>
                </div>
            </div>
            <div className={styles.card}>
                <Image src={ProfileImg} alt="" width={40} height={40}/>
                <div className={styles.details}>
                    <span className={styles.contact}>Abdo</span>
                    <span className={styles.date}>20 April</span>
                </div>
            </div>
            <div className={styles.card}>
                <Image src={ProfileImg} alt="" width={40} height={40}/>
                <div className={styles.details}>
                    <span className={styles.contact}>Abdo</span>
                    <span className={styles.date}>20 April</span>
                </div>
            </div>
        </div>
        
    )
  }
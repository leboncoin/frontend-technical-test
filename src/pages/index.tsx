import { useEffect, useState, VFC } from 'react'
import { Skeleton, Typography } from '@mui/material'
import Head from 'next/head'

import CardUser from '@Components/carUser/CardUser'
import { UseUsers } from '@Hooks/UseUsers'
import { User } from '@Types/user'

import styles from '../styles/Home.module.css'

// import Image from 'next/image'
// import Logo from '../assets/lbc-logo.webp'

const Home: VFC = () => {
  const { isLoading, getUsers } = UseUsers()
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    async function fetchUsers() {
      setUsers(await getUsers())
    }
    fetchUsers()
  }, [getUsers])

  return (
    <div className={styles.main}>
      <Head>
        <title>Frontend Technical test - Leboncoin</title>
        <meta name="description" content="Frontend exercise for developpers who want to join us on leboncoin.fr" />
      </Head>
      <Typography component="h1">Bienvenue</Typography>
      <Typography>Choisir votre compte :</Typography>
      {isLoading && (
        <>
          <Skeleton variant="rectangular" width={210} height={118} className={styles.skeleton} />
          <Skeleton variant="rectangular" width={210} height={118} className={styles.skeleton} />
          <Skeleton variant="rectangular" width={210} height={118} className={styles.skeleton} />
          <Skeleton variant="rectangular" width={210} height={118} className={styles.skeleton} />
        </>
      )}
      {!isLoading && (
        <>
          {users.map((user) => (
            <CardUser key={user.id} user={user} className={styles.card} />
          ))}
        </>
      )}
    </div>
  )
}

export default Home

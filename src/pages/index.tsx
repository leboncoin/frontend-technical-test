import { useEffect, useState, VFC } from 'react'
import { Skeleton, Typography } from '@mui/material'
import Head from 'next/head'

import CardUser from '@Components/carUser/CardUser'
import CustomAppBar from '@Components/customAppBar/CustomAppBar'
import { useUsers } from '@Hooks/UseUsers'
import { User } from '@Types/user'

import styles from './styles.module.css'

// import Image from 'next/image'
// import Logo from '../assets/lbc-logo.webp'

const Home: VFC = () => {
  const { isLoading, getUsers } = useUsers()
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    async function fetchUsers() {
      setUsers(await getUsers())
    }
    fetchUsers()
  }, [getUsers])

  return (
    <>
      <Head>
        <title>Frontend Technical test - Leboncoin</title>
        <meta name="description" content="Frontend exercise for developpers who want to join us on leboncoin.fr" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      </Head>
      <CustomAppBar title="Bienvenue" />
      <div className={styles.main}>
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
          <ul className={styles.userList}>
            {users.map((user) => (
              <li key={user.id} className={styles.card}>
                <CardUser name={user.nickname} href={`/user/${user.id}`} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  )
}

export default Home

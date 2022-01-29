import { Fragment, VFC } from 'react'
import Head from 'next/head'
import { GetServerSideProps, InferGetStaticPropsType } from 'next'
import { fetchUsers } from '../utils/handleUsers'
import { User } from '../types/user'
import { Divider, List } from '@mui/material'
import HeaderBar from '../components/headerBar/HeaderBar'
import UserList from '../components/userList/UserList'

type HomeProps = {
  users: User[]
}

const Home: VFC = ({
  users,
}: InferGetStaticPropsType<typeof getServerSideProps>) => {
  return (
    <div>
      <Head>
        <title>Frontend Technical test - Leboncoin</title>
        <meta
          name="description"
          content="Frontend exercise for developpers who want to join us on leboncoin.fr"
        ></meta>
      </Head>
      <HeaderBar title="Home" />
      <List>
        {users.map((user, index) => (
          <Fragment key={index}>
            <UserList user={user} />
            {index !== users.length - 1 && <Divider />}
          </Fragment>
        ))}
      </List>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async (
  context
) => {
  // ...

  return {
    props: {
      users: await fetchUsers(),
    },
  }
}

export default Home

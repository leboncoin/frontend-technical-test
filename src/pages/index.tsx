/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react'
import React, { useEffect, useState } from 'react'
import { User } from '../types/user'
import * as styles from './styles'
import Link from 'next/link'

const Index: React.FC = () => {
  const getUsers = async () => {
    const resp = await fetch('http://localhost:3005/users')
    const user = await resp.json()
    return user as User[]
  }

  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    const fetchData = async () => setUsers(await getUsers())
    fetchData()
  }, [])

  console.log('user', users)
  console.log(getUsers())

  return (
    <>
      <div css={styles.title}>Utilisateurs</div>
      <div>
        <ul>
          {users.map((user) => (
            <li css={styles.userCard} key={user.id}>
              <Link href={`/conversations/${user.nickname}/${user.id}`}>
                <a>{user.nickname}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default Index

import { HTMLAttributes, VFC } from 'react'
import { Card } from '@mui/material'
import Link from 'next/link'

import { User } from '@Types/user'

import CardUserItem from './CardUserItem'

type CardUserProps = { user: User; message?: string }

const CardUser: VFC<CardUserProps & HTMLAttributes<HTMLDivElement>> = ({ user, message, ...rest }) => (
  <Card key={user.id} variant="outlined" {...rest}>
    <Link href={`/user/${user.id}`}>
      <a>
        <CardUserItem name={user.nickname} message={message} />
      </a>
    </Link>
  </Card>
)

export default CardUser

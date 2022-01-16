import { HTMLAttributes, VFC } from 'react'
import { Card } from '@mui/material'
import { useRouter } from 'next/router'

import CardUserItem from './CardUserItem'

type CardUserProps = {
  name: string
  href: string
  message?: string
}

const CardUser: VFC<CardUserProps & HTMLAttributes<HTMLDivElement>> = ({ name, message, href, ...rest }) => {
  const router = useRouter()

  const goToUserPage = (e) => {
    e.preventDefault()
    router.push(href)
  }

  return (
    <Card variant="outlined" {...rest}>
      <a href={href} onClick={goToUserPage}>
        <CardUserItem name={name} message={message} />
      </a>
    </Card>
  )
}

export default CardUser

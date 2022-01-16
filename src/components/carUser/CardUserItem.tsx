import { VFC } from 'react'
import { CardContent, Typography } from '@mui/material'

import CustomAvatar from '@Components/customAvatar/CustomAvatar'

import styles from './styles.module.css'

type CardUserItemProps = {
  name: string
  message?: string
}

const CardUserItem: VFC<CardUserItemProps> = ({ name, message }) => (
  <CardContent className={styles.user}>
    <CustomAvatar name={name} className={styles.avatar} />
    <div>
      <Typography>{name}</Typography>
      {message && <Typography>{message}</Typography>}
    </div>
  </CardContent>
)

export default CardUserItem

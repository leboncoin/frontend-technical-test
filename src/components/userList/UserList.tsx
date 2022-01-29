import { VFC } from 'react'
import {
  ListItem,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material'
import Link from 'next/link'
import { User } from '../../types/user'
import BackgroundLetterAvatars from '../backgroundLetterAvatar/BackgroundLetterAvatar'

type UserListProps = {
  user: User
}

const UserList: VFC<UserListProps> = ({ user }) => {
  return (
    <ListItem disablePadding>
      <Link href={`/user/${user.id}`}>
        <ListItemButton>
          <ListItemAvatar>
            <BackgroundLetterAvatars name={user.nickname} />
          </ListItemAvatar>
          <ListItemText>
            <Typography variant="h6" component="h2">
              {user.nickname}
            </Typography>
          </ListItemText>
        </ListItemButton>
      </Link>
    </ListItem>
  )
}

export default UserList

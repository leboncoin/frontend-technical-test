import { Delete } from '@mui/icons-material'
import { Chip, Typography } from '@mui/material'
import { useState, VFC } from 'react'
import { Message } from '../../types/message'

import * as styles from './styles'

type MessagePropsChip = {
  message: Message
  isOwnerMessage: boolean
}

const MessageChip: VFC<MessagePropsChip> = ({ message, isOwnerMessage }) => {
  const [displayDeletableChip, setDisplayDeletableChip] = useState(false)

  const date = new Date(message.timestamp * 1000)
  const hours = date.getHours()
  const minutes = '0' + date.getMinutes()
  const seconds = '0' + date.getSeconds()

  const formattedTime =
    hours + ':' + minutes.substring(-2) + ':' + seconds.substring(-2)
  return (
    <div
      key={message.id}
      css={[styles.message, isOwnerMessage && styles.ownerMessage]}
    >
      {!displayDeletableChip && (
        <Chip
          label={message.body}
          onClick={() => setDisplayDeletableChip(true)}
          color={isOwnerMessage ? 'secondary' : 'primary'}
        />
      )}

      {displayDeletableChip && (
        <Chip
          label={message.body}
          onClick={() => setDisplayDeletableChip(false)}
          onDelete={console.log}
          deleteIcon={<Delete />}
          color={isOwnerMessage ? 'secondary' : 'primary'}
          sx={{
            maxWidth: '300px',
          }}
        />
      )}

      <Typography>{formattedTime}</Typography>
    </div>
  )
}

export default MessageChip

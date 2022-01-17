import { VFC } from 'react'
import { useForm } from 'react-hook-form'
import { Send } from '@mui/icons-material'
import { Divider, IconButton, Input, Paper } from '@mui/material'

import styles from './styles.module.css'

type MessageInputProps = { onSubmit: (data: any) => Promise<void> }

const MessageInput: VFC<MessageInputProps> = ({ onSubmit }) => {
  const { register, handleSubmit } = useForm()

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <Paper className={styles.input}>
        <Input
          className={styles.inputMessage}
          required
          id="message"
          {...register('message', { required: true })}
          placeholder="new message"
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton color="primary" sx={{ p: '10px' }} aria-label="submit" type="submit">
          <Send />
        </IconButton>
      </Paper>
    </form>
  )
}

export default MessageInput

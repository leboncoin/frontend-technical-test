import { Divider, IconButton, InputBase, Paper } from '@mui/material'
import { FormEvent, VFC } from 'react'
import SendIcon from '@mui/icons-material/Send'

type MessageFormProps = {
  onSubmit: (message: string) => void
}

interface FormElements extends HTMLFormControlsCollection {
  message: HTMLInputElement
}

interface YourFormElement extends HTMLFormElement {
  readonly elements: FormElements
}

const MessageForm: VFC<MessageFormProps> = ({ onSubmit }) => {
  return (
    <Paper
      component="form"
      sx={{
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
      }}
      onSubmit={(e: FormEvent<YourFormElement>) => {
        e.preventDefault()
        onSubmit(e.currentTarget.elements.message.value)
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="New Message"
        inputProps={{ 'aria-label': 'New Message' }}
        name="message"
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton
        color="primary"
        sx={{ p: '10px' }}
        aria-label="directions"
        type="submit"
      >
        <SendIcon />
      </IconButton>
    </Paper>
  )
}

export default MessageForm

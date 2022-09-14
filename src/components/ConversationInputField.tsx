import React, {useState} from "react"
import {IconButton, InputAdornment, OutlinedInput} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import useHttpClient from "../hooks/useHttpClient";
import moment from "moment";

interface ConversationInputFieldProps {
  conversationId: number
}

export default function ConversationInputField({ conversationId }: ConversationInputFieldProps) {
  const [text, setText] = useState("")
  const [isSending, setIsSending] = useState(false)
  const httpClient = useHttpClient()

  const handleSendClick = () => {
    if (text !== "") {
      setIsSending(true)
      httpClient.post(`/messages/${conversationId}`, {
        body: text,
        timestamp: moment().unix()
      }).finally(() => {
        setText("")
        setIsSending(false)
      })
    }
  }

  return (
    <OutlinedInput
      fullWidth
      value={text}
      onChange={(e) => setText(e.target.value)}
      endAdornment={
        <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            onClick={handleSendClick}
            edge="end"
            disabled={isSending}
        >
          <SendIcon />
        </IconButton>
        </InputAdornment>
      }
      placeholder="Send message"
      sx={{
        mt: 4,
        mb: 2
      }}
    />
  )
}
import { css } from "@emotion/css";
import { useState } from "react";
import { sendMessage } from "../../utils/requests";
import { mutate } from 'swr';

interface SendMessageFormProps {
  conversationId: number
}

const inputStyles = css`
  width: 100%;
  padding: 10px 20px;
  border-radius: 20px;
`

const SendMessageForm = ({ conversationId }: SendMessageFormProps) => {
  const [message, setMessage] = useState<string>('')

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!message) {
      return;
    }

    await sendMessage(conversationId, message)
    // automatically refress the list of messages after sending a new message
    mutate(['/messages', conversationId]);
    setMessage('');
  }

  return (
    <form method="POST" onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Send message"
        className={inputStyles}
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
    </form>
  )
}

export default SendMessageForm;
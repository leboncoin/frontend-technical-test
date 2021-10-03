import { FC, useState } from 'react'
import SendButton from './SendButton'

type ConversationSenderProps = {
  onSend: (conversation) => void
}

const ConversationSender: FC<ConversationSenderProps> = ({
  onSend,
}) => {
  const [conversation, setConversation] = useState({
    nickname: '',
    message: '',
  })
  const setField = (name, value) => {
    setConversation({
      ...conversation,
      [name]: value,
    })
  }
  const onSubmit = (e) => {
    e.preventDefault()
    if (conversation.nickname && conversation.message)
      onSend(conversation)
  }
  return (
    <form
      onSubmit={onSubmit}
      className="md:flex md:items-center mb-6"
    >
      <label className="label block text-grey font-bold md:text-right mb-1 md:mb-0 pr-4">
        <span className="label-text">Trouve un(e) pote ...</span>
      </label>
      <input
        type="text"
        autoComplete="off"
        placeholder="identifiant"
        className="input input-primary mr-4"
        value={conversation.nickname}
        onChange={(e) => setField('nickname', e.target.value)}
      ></input>
      <label className="label block text-grey font-bold md:text-right mb-1 md:mb-0 pr-4">
        <span className="label-text">... et commence ton chat !</span>
      </label>
      <input
        type="text"
        autoComplete="off"
        placeholder="message"
        className="input input-primary mr-4 w-3/4"
        value={conversation.message}
        onChange={(e) => setField('message', e.target.value)}
      ></input>
      <input type="submit" className="hidden" />
      <SendButton className="mt-2"></SendButton>
    </form>
  )
}
export default ConversationSender

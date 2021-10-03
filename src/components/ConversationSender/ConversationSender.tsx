import { FC, useState, useRef } from 'react'
import SendButton from '../SendButton'
import VisibilitySensor from 'react-visibility-sensor'

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

  const nicknameInput = useRef<HTMLInputElement>(null)

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
  const toggleConversationSender = (visible) => {
    if (visible) {
      nicknameInput.current.focus()
    } else {
      setConversation({
        message: '',
        nickname: '',
      })
    }
  }
  return (
    <VisibilitySensor onChange={toggleConversationSender}>
      <form
        data-testid="conversation-form"
        onSubmit={onSubmit}
        className="md:flex md:items-center mb-6"
      >
        <label
          className="label block text-grey font-bold md:text-right mb-1 md:mb-0 pr-4"
          htmlFor="nickname"
        >
          <span className="label-text">
            Tape le nom d'un ou d'une pote ...
          </span>
        </label>
        <input
          ref={nicknameInput}
          id="nickname"
          data-testid="nickname-input"
          type="text"
          autoComplete="off"
          placeholder="identifiant"
          className="input input-primary mr-4"
          value={conversation.nickname}
          onChange={(e) => setField('nickname', e.target.value)}
        ></input>
        <label
          className="label block text-grey font-bold md:text-right mb-1 md:mb-0 pr-4"
          htmlFor="message"
        >
          <span className="label-text">
            ... et écrit ici ton message
          </span>
        </label>
        <input
          id="message"
          data-testid="message-input"
          type="text"
          autoComplete="off"
          placeholder="message"
          className="input input-primary mr-4 w-3/4"
          value={conversation.message}
          onChange={(e) => setField('message', e.target.value)}
        ></input>
        <input aria-hidden="true" type="submit" className="hidden" />
        <SendButton className="mt-2" onClick={onSubmit}></SendButton>
      </form>
    </VisibilitySensor>
  )
}
export default ConversationSender

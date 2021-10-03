/* eslint react/display-name: 0 */

import {
  useState,
  forwardRef,
  useImperativeHandle,
  ForwardRefRenderFunction,
} from 'react'
import { SyntheticEvent } from 'react'
import SendButton from '../SendButton'

type MessageSenderProps = {
  onSend: (message: string) => void
}

export type MessageSenderHandle = {
  reset: () => void
}

const MessageSender: ForwardRefRenderFunction<
  MessageSenderHandle,
  MessageSenderProps
> = ({ onSend }, ref) => {
  const [message, setMessage] = useState('')
  useImperativeHandle(ref, () => ({
    reset() {
      setMessage('')
    },
  }))
  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    if (message) onSend(message)
  }

  return (
    <form
      data-testid="message-form"
      onSubmit={onSubmit}
      className="w-full mt-auto py-3 px-3 flex  border-t border-gray-300"
    >
      <input
        data-testid="message-input"
        aria-placeholder="rédigez votre message ici"
        placeholder="message"
        className="py-2 mx-3 pl-5 block w-full rounded-full bg-gray-100 outline-none focus:text-gray-700"
        type="text"
        name="message"
        value={message}
        autoComplete="off"
        autoFocus
        onChange={(e) => setMessage(e.target.value)}
      />

      <button
        className="outline-none focus:outline-none"
        type="submit"
      >
        <SendButton></SendButton>
      </button>
    </form>
  )
}
export default forwardRef(MessageSender)

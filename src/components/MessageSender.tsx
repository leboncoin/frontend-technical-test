/* eslint react/display-name: 0 */

import { FC, useState, forwardRef, useImperativeHandle } from 'react'
import { SyntheticEvent } from 'react'
import ActionButton from './ActionButton'

type MessageSenderProps = {
  onSend: (message: string) => void
}

const MessageSender = ({ onSend }, ref) => {
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
      onSubmit={onSubmit}
      className="w-full mt-auto py-3 px-3 flex  border-t border-gray-300"
    >
      <input
        aria-placeholder="Ecrire un message"
        placeholder="message"
        className="py-2 mx-3 pl-5 block w-full rounded-full bg-gray-100 outline-none focus:text-gray-700"
        type="text"
        name="message"
        value={message}
        autoComplete="off"
        onChange={(e) => setMessage(e.target.value)}
      />

      <button
        className="outline-none focus:outline-none"
        type="submit"
      >
        <ActionButton></ActionButton>
      </button>
    </form>
  )
}
export default forwardRef(MessageSender)

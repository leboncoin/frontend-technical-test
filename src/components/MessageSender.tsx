/* eslint react/display-name: 0 */

import { FC, useState, forwardRef, useImperativeHandle } from 'react'
import { SyntheticEvent } from 'react'

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
        placeholder="Ecrire un message"
        className="py-2 mx-3 pl-5 block w-full rounded-full bg-gray-100 outline-none focus:text-gray-700"
        type="text"
        name="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button
        className="outline-none focus:outline-none"
        type="submit"
      >
        <svg
          className="text-gray-400 h-7 w-7 origin-center transform rotate-90"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
        </svg>
      </button>
    </form>
  )
}
export default forwardRef(MessageSender)

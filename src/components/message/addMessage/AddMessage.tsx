import React, { FC, useRef, useState } from 'react'
import styles from './addMessage.module.css'
interface AddMessageProps {
  conversationId : number
  sendMessage : (message:string,conversationId:number) => void
}

export const AddMessage : FC<AddMessageProps> = ({conversationId, sendMessage}) => {
  const [message,setMessage] = useState<string>('')
  const inputRef = useRef(null);

  const handleChange = (e) => {
    let {target:{name,value}} = e
    setMessage(value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    sendMessage(message,conversationId)
    setMessage('')
    inputRef.current.focus();
  }

  return (
    <div>
        <div className={styles.send_message}>
          <form onSubmit={handleSubmit}>
            <p className={styles.inside}>
              <input className={styles.send_message_input} type="text" placeholder='Message ...' value={message} ref={inputRef} onChange={handleChange}/>
              <button className={styles.send} >Send</button>
            </p>
          </form>
        </div>
    </div>
  )
}

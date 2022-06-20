import React, { useEffect, useState } from 'react'
import type { FC } from 'react'
import { AddMessage } from '../addMessage/AddMessage'
import styles from './list.module.css'
import { Message } from '../message/Message'
import { useMessage } from '../../../hooks/useMessage'
import { useUser } from '../../../hooks/useUser'
import { User } from '../../../types/user'
import { Message as MessageType} from '../../../types/message'
import { fromNow } from '../../../utils/date'


interface ListProps {
    conversationId: number
    loggedUserId : number
    lastMessageTimestamp:number
}

export const List : FC<ListProps> = ({ conversationId , loggedUserId, lastMessageTimestamp}) => {
    const [me,setMe] =  useState<User>({} as User);
    const [messages,setMessages] = useState<MessageType[]>([])
    const {getMessages,postMessage} = useMessage()
    const {getUser} = useUser()

    useEffect(()=> {
        getMessagesAsync()
        getMe()
    },[])
    

    const getMe = async () => {
        let user = await getUser(loggedUserId)
        setMe(user)
    }

    const getMessagesAsync = async () =>{
        let messages = await getMessages(conversationId);
        setMessages(messages)
    }

    
    const sendMessage = async (message,conversationId) => {
        let newMessage = await postMessage(message,conversationId)
        newMessage = {...newMessage,conversationId,authorId:loggedUserId}
        setMessages([...messages,newMessage])
    }

  return (
    <div>
        <div className={styles.container}>
            <div className={styles.inside}>
                <div className={styles.head}>
                    <h2>{me.nickname}</h2>
                    <p>Last message <strong>{fromNow(lastMessageTimestamp)}</strong></p>
                </div>
                <div className={styles.list}>
                    {
                        messages.map((message,i)=>
                            <Message key={`message-${i}`} message={message} me={me} />
                        )
                    }
                </div>
                <AddMessage conversationId={conversationId} sendMessage={sendMessage}/>
            </div>
        </div>
    </div>
  )
}

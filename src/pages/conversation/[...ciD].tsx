import { DriveEta } from '@mui/icons-material'
import { GetServerSideProps, InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/dist/client/router'
import { useEffect, useState, VFC } from 'react'
import HeaderBar from '../../components/headerBar/HeaderBar'
import MessageChip from '../../components/messageChip/MessageChip'
import MessageForm from '../../components/messageForm/MessageForm'
import { Message } from '../../types/message'
import { User } from '../../types/user'
import {
  createMessage,
  fetchMessages,
  NewMessage,
} from '../../utils/handleMessages'
import { fetchUser } from '../../utils/handleUsers'

import * as styles from './style'

type ContactProps = {
  messages: Message[]
  contact: User
  conversationID: number
}

const Contact: VFC = ({
  messages,
  contact,
  conversationID,
}: InferGetStaticPropsType<typeof getServerSideProps>) => {
  const router = useRouter()

  const handleBackButton = () => {
    router.back()
  }

  const [accountID, setAccountID] = useState(0)

  const [currentMessages, setCurrentMessages] = useState<Message[]>(messages)

  useEffect(() => {
    setAccountID(parseInt(window.localStorage.getItem('userID'), 10))
  }, [])

  const handleMessageForm = (message: string) => {
    const newMessage: NewMessage = {
      conversationId: conversationID,
      timestamp: Date.now(),
      authorId: accountID,
      body: message,
    }

    const addedMessage = { ...newMessage, id: currentMessages.length + 1 }

    setCurrentMessages([...currentMessages, addedMessage])

    createMessage(newMessage)
  }

  return (
    <div>
      <HeaderBar
        title={contact.nickname}
        hasBackButton
        handleBackButton={handleBackButton}
      />

      <div css={styles.conversationPage}>
        {currentMessages.map((message) => (
          <MessageChip
            key={message.id}
            message={message}
            isOwnerMessage={message.authorId === accountID}
          />
        ))}

        <MessageForm onSubmit={handleMessageForm} />
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<ContactProps> = async ({
  query: { ciD },
}) => {
  return {
    props: {
      messages: await fetchMessages(ciD[1]),
      contact: await fetchUser(ciD[0]),
      conversationID: parseInt(ciD[1], 10),
    },
  }
}

export default Contact

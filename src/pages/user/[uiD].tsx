import {
  ListItem,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Typography,
  Divider,
  List,
} from '@mui/material'
import { InferGetStaticPropsType, GetServerSideProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { Fragment, useEffect, VFC } from 'react'
import HeaderBar from '../../components/headerBar/HeaderBar'
import { Conversation } from '../../types/conversation'
import { User } from '../../types/user'
import { fetchConversations } from '../../utils/handleConversations'
import { fetchUser } from '../../utils/handleUsers'
import BackgroundLetterAvatars from '../../components/backgroundLetterAvatar/BackgroundLetterAvatar'
import { useRouter } from 'next/dist/client/router'

type UserPageProps = {
  user: User
  conversations: Conversation[]
}

const UserPage: VFC = ({
  user,
  conversations,
}: InferGetStaticPropsType<typeof getServerSideProps>) => {
  const router = useRouter()

  useEffect(() => {
    window.localStorage.setItem('userID', user.id.toString())
  }, [user])

  const getContactId = (
    { recipientId, senderId }: Conversation,
    userID: number
  ): string =>
    senderId.toString() === userID.toString()
      ? recipientId.toString()
      : senderId.toString()

  const getContactName = (
    { recipientNickname, senderNickname, senderId }: Conversation,
    userID: number
  ): string =>
    senderId.toString() === userID.toString()
      ? recipientNickname
      : senderNickname

  const handleBackButton = () => {
    router.back()
  }
  return (
    <div>
      <Head>
        <title>{user.nickname} - Leboncoin</title>
      </Head>
      <HeaderBar
        title={`Welcome ${user.nickname}`}
        hasBackButton
        handleBackButton={handleBackButton}
      />
      <div>
        <List>
          {conversations.map((conversation, index) => (
            <Fragment key={index}>
              <ListItem disablePadding>
                <Link
                  href={`/conversation/${getContactId(conversation, user.id)}/${
                    conversation.id
                  }`}
                >
                  <ListItemButton>
                    <ListItemAvatar>
                      <BackgroundLetterAvatars
                        name={getContactName(conversation, user.id)}
                      />
                    </ListItemAvatar>
                    <ListItemText>
                      <Typography variant="h6" component="h2">
                        {getContactName(conversation, user.id)}
                      </Typography>
                    </ListItemText>
                  </ListItemButton>
                </Link>
              </ListItem>
              {index !== conversations.length - 1 && <Divider />}
            </Fragment>
          ))}
        </List>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<UserPageProps> = async ({
  query: { uiD },
}) => {
  return {
    props: {
      user: await fetchUser(uiD[0]),
      conversations: await fetchConversations(uiD[0]),
    },
  }
}

export default UserPage

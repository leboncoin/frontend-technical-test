import { Input, Empty, Layout, PageHeader } from 'antd'
import { Formik, Field, Form } from 'formik'
import map from 'lodash/map'
import head from 'lodash/head'
import orderBy from 'lodash/orderBy'
import type { FC } from 'react'
import { useState, useEffect } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Message, MessageInputValues } from '../../../../types/message'
import MessageCard from '../../../../components/message'
import styles from '../../../../styles/Conversation.module.css'
import { getLoggedUserId } from '../../../../utils/getLoggedUserId'
import { useMessages } from '../../../../hooks/useMessages'
import { useUser } from '../../../../hooks/useUser'

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const conversationId = parseInt(params.id as string)
  const recipientId = parseInt(params.recipientId as string)
  return {
    props: {
      recipientId,
      conversationId,
    }
  }
}

interface ConversationProps {
  recipientId: number,
  conversationId: number,
}

const Conversation: FC = ({ conversationId, recipientId }: ConversationProps) => {
  const { Content, Footer } = Layout
  const [value, setValue] = useState<string>('')
  const [messages, setMessages] = useState<Message[]>([])
  
  const router = useRouter()
  const loggedUserId = getLoggedUserId()
  
  const {
    getMessages,
    postMessage,
  } = useMessages()
  const {
    user: recipient,
  } = useUser(
    recipientId
  )
  
  const lastMessageTimestamp = messages.length > 0 ? head(
    orderBy(
      messages,
      'timestamp',
      'desc'
    )
  ).timestamp : null
  const lastMessageDate = new Date(lastMessageTimestamp)

  const getMessagesAsync = async () =>{
    const messages = await getMessages(conversationId);
    setMessages(messages)
  }

  const sendMessage = async (payload: MessageInputValues) => {
    const newMessage = await postMessage(payload)
    setMessages([...messages, newMessage])
    setValue('')
  }

  useEffect(() => {
    getMessagesAsync()
  }, [])

  return (
    <Layout className={styles.conversationContainer}>
      <Head>
        <title>{`Conversation avec ${recipient?.nickname}`}</title>
        <meta name="description" content={`Conversation avec ${recipient?.nickname}`}></meta>
      </Head>
      <PageHeader
        className={styles.pageHeader}
        onBack={() => router.push('/')}
        title={recipient?.nickname}
        subTitle={`${lastMessageTimestamp ? `Dernier message ${lastMessageDate.toLocaleString('fr-FR')}` : ''}`}
      />
      <Content className={styles.content}>
        {messages.length > 0 ? (
          <ul className={styles.messagesList}>
            {map(
              messages,
              (message: Message) => {
                const fromMe = message.authorId === loggedUserId
                return (
                  <li key={message.id} className={`${styles.messageContainer} ${fromMe ? styles.fromMe : ''}`}>
                    {!fromMe && <span className={styles.recipientNickname}>{recipient?.nickname}</span>}
                    <MessageCard
                      fromMe={fromMe}
                      body={message.body}
                    />
                  </li>
                )
              }
            )}
          </ul>
        ) : (
          <Empty description={false} />
        )}
      </Content>
      <Footer className={styles.footer}>
        <Formik
          initialValues={{
            body: '',
            conversationId,
            authorId: loggedUserId,
          }}
          onSubmit={(values: MessageInputValues) => sendMessage(values)}
        >
          {({ setFieldValue }) => (
            <Form>
              <Input.Group compact className={styles.inputGroup}>
                  <Field
                    id="body"
                    name="body"
                  >
                    {({field}) => (
                      <Input
                        {...field}
                        value={value}
                        onChange={e => {
                          const body = e.target.value
                          setFieldValue('body', body)
                          setValue(body)
                        }}
                        placeholder="Envoyez un message"
                      />
                    )}
                  </Field>
                <button type="submit">Submit</button>
              </Input.Group>
            </Form>
          )}
        </Formik>
      </Footer>
    </Layout>
  )
}

export default Conversation

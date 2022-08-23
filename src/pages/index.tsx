import { LoadingOutlined } from '@ant-design/icons';
import { Layout, Spin, Empty, Row, Col, Typography } from 'antd'
import map from 'lodash/map'
import type { FC } from 'react'
import Head from 'next/head'
import { useConversations } from '../hooks/useConversations'
import { Conversation } from '../types/conversation'
import { getLoggedUserId } from '../utils/getLoggedUserId'
import ConversationCard from '../components/conversation'
import styles from '../styles/Home.module.css'

const Home: FC = () => {
  const { Content } = Layout
  const { Title } = Typography
  const loggedUserId = getLoggedUserId()
  const {
    fetching,
    conversations,
  } = useConversations(
    loggedUserId
  )

  return (
    <Layout className={styles.container}>
      <Head>
        <title>Frontend Technical test - Leboncoin</title>
        <meta name="description" content="Frontend exercise for developpers who want to join us on leboncoin.fr"></meta>
      </Head>
      <Title className={styles.title}>Frontend Technical test - Leboncoin</Title>
      <Content className={styles.main}>
        {fetching && (
          <Row>
            <Col span={24}>
              <Spin
                indicator={(
                  <LoadingOutlined style={{ fontSize: 24 }} spin />
                )}
              />
            </Col>
          </Row>
        )}
        {(!fetching && conversations.length > 0) ? (
          <ul className={styles.conversationsList}>
            {map(
              conversations,
              (conversation: Conversation) => (
                <li key={conversation.id}>
                  <ConversationCard {...conversation} />
                </li>
              )
            )}
          </ul>
        ) : (
          <Empty description={false} />
        )}
      </Content>
    </Layout>
  )
}

export default Home
import type { FC } from 'react'
import Head from 'next/head'
import Image from 'next/image'

import { Title } from '../components/Title.styled'
import { Card } from '../components/Card.styled'
import { Code } from '../components/Code.styled'
import { Container, Main, CardList } from '../components/Containers.styled'
import { Description } from '../components/Description.styled'
import { Footer } from '../components/Footer.styled'

import Logo from '../assets/lbc-logo.webp'

const Home: FC = () => {
  const year = new Date().getFullYear()

  return (
    <Container>
      <Head>
        <title>Frontend Technical test - Leboncoin</title>
        <meta name="description" content="Frontend exercise for developpers who want to join us on leboncoin.fr"></meta>
      </Head>

      <Main>
        <Image src={Logo} alt="Leboncoin Frontend Team" width={400} height={125} />

        <Title> Welcome !</Title>

        <Description>
          This test is based on a <a title="Next.js documentation" href="https://nextjs.org/docs/getting-started" target="_blank" rel="noopener noreferrer">Next.js</a> application.<br />
          Fork the repository and use the <Code>main</Code> branch as your starting point.
          <br /><br />

          Get started by reading{' '}
          <Code>README.md</Code> and editing <Code>src/pages/index.js</Code>
          <br />
          Once you are done, send the repository link to your HR contact.
        </Description>

        <CardList>
          <Card>
            <h2>Design</h2>
            <p>Feel free to create any design you want for this exercise. Let your creativity talks !</p>
          </Card>

          <Card>
            <h2>Libraries</h2>
            <p>Feel free to use any library you want. Only Next.js / React are required.</p>
          </Card>

          <Card>
            <h2>API Server</h2>
            <p>
              Start the API server on port <Code>3005</Code> by running<br /><Code>npm run start-server</Code>.<br/>
              Find the swagger definitions in <Code>docs/api-swagger.yml</Code> or <a title="API Swagger documentation" href="https://leboncoin.tech/frontend-technical-test/" target="_blank" rel="noopener noreferrer">the online documentation</a>.
            </p>
          </Card>

          <Card>
            <h2>Timing</h2>
            <p>We recommend 4 hours for this test. You are free to spend more (or less) time, let us know how much time did you spend.</p>
          </Card>
        </CardList>
      </Main>

      <Footer>
        &copy; leboncoin - {year}
      </Footer>
    </Container>
  )
}

export default Home
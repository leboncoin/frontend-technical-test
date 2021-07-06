import type { FC } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import Logo from '../assets/lbc-logo.webp'

const Home: FC = () => {
  const year = new Date().getFullYear()

  return (
    <div className={styles.container}>
      <Head>
        <title>Frontend Technical test - Leboncoin</title>
        <meta name="description" content="Frontend exercise for developpers who want to join us on leboncoin.fr"></meta>
      </Head>

      <main className={styles.main}>
        <Image src={Logo} alt="Leboncoin's logo" width={400} height={125} />
        <h1 className={styles.title}>
          Welcome !
        </h1>

        <p className={styles.description}>
          This test is based on a <a href="https://nextjs.org/docs/getting-started" target="_blank" rel="noopener noreferrer">Next.js</a> application.<br />
          Get started by reading{' '}
          <code className={styles.code}>README.md</code> and editing <code className={styles.code}>src/pages/index.js</code>
          <br /><br />
          Create your branch using the <code className={styles.code}>[YYYY-mm]-[name]</code> pattern.
          <br />
          Once you have finished your test, create a pull request on our <a href="https://github.com/leboncoin/frontend-technical-test" target="_blank" rel="noopener noreferrer">repository</a>.
        </p>

        <div className={styles.grid}>
          <article className={styles.card}>
            <h2>Design &rarr;</h2>
            <p>Feel free to create any design you want for this exercise. Let your creativity talks !</p>
          </article>

          <article className={styles.card}>
            <h2>Libraries &rarr;</h2>
            <p>Feel free to use any library you want. Only Next.js / React are required.</p>
          </article>

          <article className={styles.card}>
            <h2>API Server&rarr;</h2>
            <p>
              Start the API server by running<br /><code className={styles.code}>npm run start:server</code>.<br/>
              Find the swagger definitions in <code className={styles.code}>docs/api-swagger.yml</code> or <a href="https://leboncoin.tech/frontend-technical-test/" target="_blank" rel="noopener noreferrer">here</a>.
            </p>
          </article>

          <article className={styles.card}>
            <h2>Timing &rarr;</h2>
            <p>We recommend 4 hours for this test. Feel free to use more or less time, but let us know how much time you take for your test.</p>
          </article>
        </div>
      </main>

      <footer className={styles.footer}>
        &copy; leboncoin - {year}
      </footer>
    </div>
  )
}

export default Home
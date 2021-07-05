import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import Logo from '../../public/lbc-logo.png'

export default function Home() {

  const year = new Date().getFullYear()

  return (
    <div className={styles.container}>
      <Head>
        <title>Frontend Technical test - Leboncoin</title>
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
          <article href="#" className={styles.card}>
            <h3>Design &rarr;</h3>
            <p>Feel free to create any design you want for this exercise. Let your creativity talks !</p>
          </article>

          <article href="#" className={styles.card}>
            <h3>Libraries &rarr;</h3>
            <p>Feel free to use any library you want. Only Next.js / React are required.</p>
          </article>

          <article href="#" className={styles.card}>
            <h3>API Server&rarr;</h3>
            <p>
              Start the API server by running<br /><code className={styles.code}>npm run start:server</code>.<br/>
              Find the swagger defintions in <code className={styles.code}>docs/api-swagger.yml</code>.
            </p>
          </article>

          <article href="#" className={styles.card}>
            <h3>Timing &rarr;</h3>
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

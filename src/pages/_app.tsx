import type { AppProps } from 'next/app'
import axios from 'axios'
import Head from 'next/head'
import '../styles/globals.css'
import styles from '../styles/Home.module.css'

// URL shoulb be an environment variable
axios.defaults.baseURL = 'http://localhost:3005';

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <div className={styles.container}>
      <Head>
        <title>Frontend Technical test - Leboncoin</title>
        <meta name="description" content="Frontend exercise for developpers who want to join us on leboncoin.fr"></meta>
      </Head>

      <main className={styles.main}>
        <Component {...pageProps} />
      </main>
    </div>
  )
}

export default MyApp

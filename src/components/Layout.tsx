import { FC, ReactNode } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

type Props = {
  children: ReactNode
}

const Layout: FC<Props> = ({ children }) => {
  const year = new Date().getFullYear()

  return (
    <>
      <Head>
        <title>Frontend Technical test - Leboncoin</title>
        <meta
          name="description"
          content="Frontend exercise for developpers who want to join us on leboncoin.fr"
        ></meta>
      </Head>
      <main className="container mx-auto p-4">{children}</main>
      <footer className={styles.footer}>&copy; leboncoin - {year}</footer>
    </>
  )
}

export default Layout

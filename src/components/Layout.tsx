import type { FC } from 'react'
import Head from 'next/head'

const Layout: FC = ({ children }) => {
  return (
    <>
      <Head>
        <title>Chaty</title>
        <meta
          name="description"
          content="Chat with your friends, everywhere !!"
        ></meta>
      </Head>
      <main className="container max-w-2xl">{children}</main>
    </>
  )
}
export default Layout

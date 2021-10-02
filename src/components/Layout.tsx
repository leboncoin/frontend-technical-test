import type { FC } from 'react'
import Head from 'next/head'

const Layout: FC = ({ children }) => {
  return (
    <div className="layout">
      <Head>
        <title>Chaty</title>
        <meta
          name="description"
          content="Chat with your friends, everywhere !!"
        ></meta>
      </Head>
      <main className="sm:container">{children}</main>
    </div>
  )
}
export default Layout

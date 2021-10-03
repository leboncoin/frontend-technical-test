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
        <link
          href="https://cdn.jsdelivr.net/npm/daisyui@1.14.2/dist/full.css"
          rel="stylesheet"
          type="text/css"
        />
      </Head>
      <main>{children}</main>
    </>
  )
}
export default Layout

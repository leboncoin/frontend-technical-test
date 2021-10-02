import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import { getLoggedUserId } from '../utils/getLoggedUserId'
import 'tailwindcss/tailwind.css'

// Default way to get a logged user
export const loggedUserId = getLoggedUserId()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp

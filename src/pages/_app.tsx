import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import { getLoggedUserId } from '../utils/getLoggedUserId'
import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import { SWRConfig } from 'swr'
import toast, { Toaster } from 'react-hot-toast'

// Default way to get a logged user
export const loggedUserId = getLoggedUserId()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        refreshInterval: 1000,
        onError: () => {
          toast.error(
            'petite erreur reseau, tiens bon ça va revenir',
            { id: 'app' },
          )
        },
      }}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <Toaster />
    </SWRConfig>
  )
}

export default MyApp

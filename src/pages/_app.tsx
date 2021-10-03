import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import { getLoggedUserId } from '../utils/getLoggedUserId'
import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import { Toaster } from 'react-hot-toast'
import CustomSWRConfig from '../components/CustomSWRConfig'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CustomSWRConfig>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <Toaster
        toastOptions={{
          duration: 1500,
        }}
      />
    </CustomSWRConfig>
  )
}

export default MyApp

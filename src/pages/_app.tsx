import type { AppProps } from 'next/app'
import { StoreProvider } from '../store/store'
import { AuthLayer } from '../components/AuthLayer'

import Layout from '../components/Layout'
import '../styles/globals.css'

export const apiUrl = 'http://localhost:3005'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <StoreProvider>
        {
          // Display reload button when identification failed
          <AuthLayer>
            <Component {...pageProps} />
          </AuthLayer>
        }
      </StoreProvider>
    </Layout>
  )
}

export default MyApp

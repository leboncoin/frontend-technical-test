import type { AppProps } from 'next/app'

import { getLoggedUserId } from '../utils/getLoggedUserId'

import CssBaseline from '../components/CssBaseline'

import '../styles/globals.css'

// Default way to get a logged user
export const loggedUserId = getLoggedUserId()

function MyApp({ Component, pageProps }: AppProps) {
  return (<>
  <CssBaseline />
  <Component {...pageProps} />
  </>)
}

export default MyApp

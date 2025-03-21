import type { AppProps } from 'next/app'
import { getLoggedUserId } from '../utils/getLoggedUserId'
import '../styles/globals.css'

// Default way to get a logged user
export const loggedUserId = getLoggedUserId()

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

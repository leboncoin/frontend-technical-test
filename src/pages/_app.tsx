import type { AppProps } from 'next/app'
import initAxios from '../libs/axios'
import { getLoggedUserId } from '../utils/getLoggedUserId'
import '../styles/globals.css'

initAxios()
// Default way to get a logged user
export const loggedUserId = getLoggedUserId()

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp

import type { AppProps } from 'next/app'

import { getLoggedUserId } from '../utils/getLoggedUserId'

import '../styles/globals.css'

// Default way to get a logged user
export const loggedUserId = getLoggedUserId()

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp

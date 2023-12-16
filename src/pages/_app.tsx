import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import type { AppProps } from 'next/app'
import { useState } from 'react'

import { getLoggedUserId } from '@/utils/getLoggedUserId'
import '../styles/globals.css'

// Default way to get a logged user
export const loggedUserId = getLoggedUserId()

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={pageProps.dehydratedState}>
        <Component {...pageProps} />
      </HydrationBoundary>
    </QueryClientProvider>
  )
}

export default MyApp

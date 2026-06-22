import type { AppProps } from 'next/app'
import { QueryClientProvider } from '@tanstack/react-query'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorFallback } from '@/components/ErrorFallback'
import { queryClient } from '@/lib/react-query'
import '../styles/globals.css'

export const loggedUserId = 1

const App = ({ Component, pageProps }: AppProps) => (
  <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => window.location.reload()}>
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  </ErrorBoundary>
)

export default App

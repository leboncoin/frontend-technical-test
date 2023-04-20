import type { AppProps } from "next/app";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { useState } from "react";

import { UserProvider } from "@Containers/User/user-context";

import CssBaseline from "@Components/CssBaseline";

import "@Styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <UserProvider>
          <CssBaseline />
          <Component {...pageProps} />
        </UserProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;

import type { AppProps } from "next/app";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { useState } from "react";

import { UserProvider } from "@Containers/User/user-context";
import { NotificationProvider } from "@Containers/Notification/notification-context";

import LBCThemeProvider from "@Components/ThemeProvider";
import CssBaseline from "@Components/CssBaseline";

import "@Styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <LBCThemeProvider>
          <NotificationProvider>
            <UserProvider>
              <CssBaseline />
              <Component {...pageProps} />
            </UserProvider>
          </NotificationProvider>
        </LBCThemeProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;

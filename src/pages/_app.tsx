import type { AppProps } from "next/app";

import { getLoggedUserId } from "@Utils/getLoggedUserId";

import CssBaseline from "@Components/CssBaseline";

import "@Styles/globals.css";

// Default way to get a logged user
export const loggedUserId = getLoggedUserId();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <CssBaseline />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;

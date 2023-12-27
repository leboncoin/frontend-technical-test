import type { AppProps } from "next/app";
import { getLoggedUserId } from "../utils/getLoggedUserId";
import "../styles/globals.css";
import Header from "../components/Header/Header";

// Default way to get a logged user
export const loggedUserId = getLoggedUserId();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;

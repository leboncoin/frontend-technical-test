import type { AppProps } from 'next/app';
import { getLoggedUserId } from '../utils/getLoggedUserId';
import '../styles/globals.css';
import { Layout } from 'src/components/Layout/Layout';
import { UserProvider } from 'src/context/user.context';


// Default way to get a logged user
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </Layout>
  );
}

export default MyApp;

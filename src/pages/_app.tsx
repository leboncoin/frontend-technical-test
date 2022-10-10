import type { AppProps } from 'next/app';

import { getLoggedUserId } from '@/d_users/utils/getLoggedUserId';

import { ConversationProvider } from '@/d_conversations/list-conversations/context/ConversationContext';

import '@/shared/styles/globals.sass';

// Default way to get a logged user
export const loggedUserId = getLoggedUserId();

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ConversationProvider>
            <Component {...pageProps} />
        </ConversationProvider>
    );
}

export default MyApp;

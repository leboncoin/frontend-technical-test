import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';

import { ConversationProvider } from '@/d_conversations/shared/context/ConversationContext';
import { MessageProvider } from '@/d_messages/shared/context/MessageContext';
import { UserProvider } from '@/d_users/shared/context/UserContext';

import '@/shared/styles/globals.sass';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <SWRConfig
            value={{
                refreshInterval: 3000,
                fetcher: (resource, init) => fetch(resource, init).then((res) => res.json()),
            }}
        >
            <ConversationProvider>
                <MessageProvider>
                    <UserProvider>
                        <Component {...pageProps} />
                    </UserProvider>
                </MessageProvider>
            </ConversationProvider>
        </SWRConfig>
    );
}

export default MyApp;

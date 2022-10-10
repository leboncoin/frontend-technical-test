import type { AppProps } from 'next/app';

import { ConversationProvider } from '@/d_conversations/shared/context/ConversationContext';
import { MessageProvider } from '@/d_messages/shared/context/MessageContext';

import '@/shared/styles/globals.sass';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ConversationProvider>
            <MessageProvider>
                <Component {...pageProps} />
            </MessageProvider>
        </ConversationProvider>
    );
}

export default MyApp;

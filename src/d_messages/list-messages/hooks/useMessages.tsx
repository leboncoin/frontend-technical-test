import { useContext } from 'react';

import { MessageContext } from '@/d_messages/shared/context/MessageContext';

export const useMessages = () => {
    const context = useContext(MessageContext);

    if (context === undefined) {
        throw new Error('useMessages is to be used in MessageContext');
    }

    return context;
};

export default useMessages;

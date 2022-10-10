import { useContext } from 'react';
import { ConversationContext } from '../context/ConversationContext';

export const useConversations = () => {
    const context = useContext(ConversationContext);

    if (context === undefined) {
        throw new Error('useConversations is to be used in ConversationContext');
    }

    return context;
};

export default useConversations;

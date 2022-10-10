import { createContext, useReducer } from 'react';
import conversationReducer, {
    ConversationActionType,
    initialState,
} from '../store/conversationReducer';
import { Conversation } from '../types/Conversation';

type ConversationContextProps = {
    conversations: Conversation[];
    getConversations?: (conversations: Conversation[]) => void;
};

export const ConversationContext = createContext<ConversationContextProps>({
    conversations: initialState.conversations,
});

export const ConversationProvider = ({ children }) => {
    const [state, dispatch] = useReducer(conversationReducer, initialState);

    const getConversations = (conversations: Conversation[]) => {
        dispatch({
            type: ConversationActionType.GET_ALL,
            payload: conversations,
        });
    };

    const value: ConversationContextProps = {
        conversations: state.conversations,
        getConversations,
    };

    return <ConversationContext.Provider value={value}>{children}</ConversationContext.Provider>;
};

import { createContext, useReducer } from 'react';
import conversationReducer, {
    ConversationActionType,
    initialState,
} from '../store/conversationReducer';
import { Conversation } from '../types/Conversation';

type ConversationContextProps = {
    conversations: Conversation[];
    currentConversationId: number;
    getConversations?: (conversations: Conversation[]) => void;
    getCurrentConversation?: (conversationId: number) => void;
    deleteConversation?: (conversationId: number) => void;
};

export const ConversationContext = createContext<ConversationContextProps>({
    conversations: initialState.conversations,
    currentConversationId: initialState.currentConversationId,
});

export const ConversationProvider = ({ children }) => {
    const [state, dispatch] = useReducer(conversationReducer, initialState);

    const getConversations = (conversations: Conversation[]) => {
        dispatch({
            type: ConversationActionType.GET_ALL,
            payload: conversations,
        });
    };

    const getCurrentConversation = (conversationId: number) => {
        dispatch({
            type: ConversationActionType.GET_CURRENT,
            payload: conversationId,
        });
    };

    const deleteConversation = (conversationId: number) => {
        dispatch({
            type: ConversationActionType.DELETE,
            payload: conversationId,
        });
    };

    const value: ConversationContextProps = {
        conversations: state.conversations,
        currentConversationId: state.currentConversationId,
        getConversations,
        getCurrentConversation,
        deleteConversation,
    };

    return <ConversationContext.Provider value={value}>{children}</ConversationContext.Provider>;
};

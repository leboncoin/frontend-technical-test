import { createContext, useReducer } from 'react';
import messageReducer, { MessageActionType, initialState } from '../store/messageReducer';
import { Message } from '../types/Message';

type MessageContextProps = {
    messages: Message[];
    getMessages?: (messages: Message[]) => void;
};

export const MessageContext = createContext<MessageContextProps>({
    messages: initialState.messages,
});

export const MessageProvider = ({ children }) => {
    const [state, dispatch] = useReducer(messageReducer, initialState);

    const getMessages = (messages: Message[]) => {
        dispatch({
            type: MessageActionType.GET,
            payload: messages,
        });
    };

    const value: MessageContextProps = {
        messages: state.messages,
        getMessages,
    };

    return <MessageContext.Provider value={value}>{children}</MessageContext.Provider>;
};

import { createContext, useReducer } from 'react';
import messageReducer, { MessageActionType, initialState } from '../store/messageReducer';
import { Message } from '../types/Message';

type MessageContextProps = {
    messages: Message[];
    getMessages?: (messages: Message[]) => void;
    sendMessage?: (message: Message) => void;
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

    const sendMessage = (message: Message) => {
        dispatch({
            type: MessageActionType.SEND,
            payload: message,
        });
    };

    const value: MessageContextProps = {
        messages: state.messages,
        getMessages,
        sendMessage,
    };

    return <MessageContext.Provider value={value}>{children}</MessageContext.Provider>;
};

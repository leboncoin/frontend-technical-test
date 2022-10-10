import type { Message } from '../types/Message';

export enum MessageActionType {
    GET = 'GET_MESSAGES',
    SEND = 'SEND_MESSAGES',
}

interface MessageState {
    messages: Message[];
}

interface MessageAction {
    type: MessageActionType;
    payload: Message[] | Message;
}

export const initialState = {
    messages: [
        {
            id: 1,
            conversationId: 1,
            timestamp: 1625637849,
            authorId: 1,
            body: "Bonjour c'est le premier message de la première conversation",
        },
        {
            id: 2,
            conversationId: 1,
            timestamp: 1625637867,
            authorId: 1,
            body: "Bonjour c'est le second message de la première conversation",
        },
        {
            id: 3,
            conversationId: 1,
            timestamp: 1625648667,
            authorId: 2,
            body: "Bonjour c'est le troisième message de la première conversation",
        },
    ],
};

const messageReducer = (state: MessageState, action: MessageAction) => {
    const { type, payload } = action;

    switch (type) {
        case MessageActionType.GET:
            return {
                ...state,
                messages: payload as Message[],
            };
        case MessageActionType.SEND:
            return {
                ...state,
                messages: [...state.messages, payload as Message],
            };
        default:
            throw new Error(`No case for type ${type} in messageReducer.`);
    }
};

export default messageReducer;

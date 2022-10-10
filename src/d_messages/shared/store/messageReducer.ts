import type { Message } from '../types/Message';

export enum MessageActionType {
    GET_ALL = 'GET_MESSAGES',
    SEND = 'SEND_MESSAGE',
}

interface MessageState {
    messages: Message[];
}

interface MessageAction {
    type: MessageActionType;
    payload: Message[] | Message;
}

export const initialState = {
    messages: [],
};

const messageReducer = (state: MessageState, action: MessageAction) => {
    const { type, payload } = action;

    switch (type) {
        case MessageActionType.GET_ALL:
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

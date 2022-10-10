import type { Conversation } from '../types/Conversation';

export enum ConversationActionType {
    GET = 'GET_CONVERSATIONS',
}

interface ConversationState {
    conversations: Conversation[];
}

interface ConversationAction {
    type: ConversationActionType;
    payload: Conversation[];
}

export const initialState = {
    conversations: [
        {
            id: 1,
            recipientId: 2,
            recipientNickname: 'Jeremie',
            senderId: 1,
            senderNickname: 'Thibaut',
            lastMessageTimestamp: 1625637849,
        },
        {
            id: 2,
            recipientId: 3,
            recipientNickname: 'Patrick',
            senderId: 1,
            senderNickname: 'Thibaut',
            lastMessageTimestamp: 1620284667,
        },
    ],
};

const conversationReducer = (state: ConversationState, action: ConversationAction) => {
    const { type, payload } = action;

    switch (type) {
        case ConversationActionType.GET:
            return {
                ...state,
                conversations: payload as Conversation[],
            };

        default:
            throw new Error(`No case for type ${type} in conversationReducer.`);
    }
};

export default conversationReducer;

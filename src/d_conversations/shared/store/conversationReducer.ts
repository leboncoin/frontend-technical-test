import type { Conversation } from '../types/Conversation';

export enum ConversationActionType {
    GET_ALL = 'GET_CONVERSATIONS',
    GET_CURRENT = 'GET_CURRENT_CONVERSATION',
    DELETE = 'DELETE_CONVERSATION',
}

interface ConversationState {
    conversations: Conversation[];
    currentConversationId: number;
}

interface ConversationAction {
    type: ConversationActionType;
    payload: Conversation[] | number;
}

export const initialState = {
    conversations: [],
    currentConversationId: null,
};

const conversationReducer = (state: ConversationState, action: ConversationAction) => {
    const { type, payload } = action;

    switch (type) {
        case ConversationActionType.GET_ALL:
            return {
                ...state,
                conversations: payload as Conversation[],
            };
        case ConversationActionType.GET_CURRENT:
            return {
                ...state,
                currentConversationId: payload as number,
            };
        case ConversationActionType.DELETE:
            return {
                ...state,
                conversations: state.conversations.filter(
                    (conversation) => conversation.id !== (payload as number)
                ),
            };

        default:
            throw new Error(`No case for type ${type} in conversationReducer.`);
    }
};

export default conversationReducer;

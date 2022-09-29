import { fetchMessagesByConversationId, postMessage as postMessageAPI } from '../services/messages/api';
import { MessageInputValues } from '../types/message';

export const useMessages = () => {
    const getMessages = async (conversationId: number) => await fetchMessagesByConversationId(conversationId)
    const postMessage = async (payload: MessageInputValues) => await postMessageAPI(payload)

    return {
        getMessages,
        postMessage,
    }
}

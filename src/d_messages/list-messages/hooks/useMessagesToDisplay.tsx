import useConversations from '@/d_conversations/list-conversations/hooks/useConversations';
import useMessages from './useMessages';
import useLoggedUser from '@/d_users/get-connected-user/hooks/useLoggedUser';

import type { MessageItemProps } from '../components/MessageItem/MessageItem';

const useMessagesToDisplay = () => {
    const { messages } = useMessages();
    const { conversations, currentConversationId } = useConversations();
    const { loggedUser } = useLoggedUser();

    const currentConversation = conversations.find(({ id }) => id === currentConversationId);

    const messagesToDisplay: MessageItemProps[] = messages?.map(({ id, body, authorId }) => ({
        id,
        nickname: currentConversation?.recipientNickname,
        content: body,
        loggedIsSender: loggedUser.id === authorId,
    }));

    return { messagesToDisplay };
};

export default useMessagesToDisplay;

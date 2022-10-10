import useConversations from '@/d_conversations/list-conversations/hooks/useConversations';
import useMessages from './useMessages';
import useLoggedUser from '@/d_users/connected-user/hooks/useLoggedUser';

import type { MessageItemProps } from '../components/MessageItem/MessageItem';

const useMessagesToDisplay = () => {
    const { messages } = useMessages();
    const { conversations } = useConversations();
    const { loggedUser } = useLoggedUser();

    const currentConversation = conversations.find(({ id }) => id === messages[0].conversationId);

    console.log({
        authorId: messages[0].authorId,
        loggedUser: loggedUser.id,
        isSender: messages[0].authorId === loggedUser.id,
    });

    const messagesToDisplay: MessageItemProps[] = messages.map(({ id, body, authorId }) => ({
        id,
        nickname: currentConversation.recipientNickname,
        content: body,
        loggedIsSender: loggedUser.id === authorId,
    }));

    return { messagesToDisplay };
};

export default useMessagesToDisplay;

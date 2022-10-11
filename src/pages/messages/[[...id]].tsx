import { GetServerSideProps } from 'next';
import { FC, useEffect } from 'react';
import useSWR from 'swr';

import callAPI from '@/shared/http/callAPI';
import { getLoggedUserId } from '@/d_users/get-connected-user/utils/getLoggedInUser';
import useConversations from '@/d_conversations/list-conversations/hooks/useConversations';
import useUsers from '@/d_users/list-users/hooks/useUsers';
import { Conversation } from '@/d_conversations/shared/types/Conversation';
import { User } from '@/d_users/shared/types/User';

import ConversationsMessages from '@/d_conversations-messages/components/ConversationsMessages';
import useMessages from '@/d_messages/list-messages/hooks/useMessages';
import { baseURL } from '@/shared/constants';

type MessagesAppProps = {
    conversations: Conversation[];
    users: User[];
    currentConversationId: number;
};
export const MessagesApp: FC<MessagesAppProps> = ({
    conversations,
    users,
    currentConversationId,
}: MessagesAppProps) => {
    const { getConversations, getCurrentConversation } = useConversations();
    const { getUsers } = useUsers();
    const { getMessages } = useMessages();

    const { data } = useSWR(
        currentConversationId ? `${baseURL}messages/${currentConversationId}` : null
    );

    useEffect(() => {
        getConversations(conversations);
        getUsers(users);

        if (currentConversationId) {
            getCurrentConversation(currentConversationId);
            getMessages(data);
        }
    }, [conversations, currentConversationId, users, data]);

    return <ConversationsMessages />;
};

export const getServerSideProps: GetServerSideProps = (context) => {
    const {
        params: { id },
    } = context;

    const loggedUserId = getLoggedUserId();

    const conversationsPromise = callAPI.get(`/conversations/${loggedUserId}`);
    const usersPromise = callAPI.get('/users');

    return Promise.all([conversationsPromise, usersPromise]).then(
        ([conversationsResponse, usersResponse]) => {
            const conversations = conversationsResponse.data;
            const users = usersResponse.data;

            return {
                props: {
                    conversations,
                    users,
                    currentConversationId: parseInt(id as string) ?? null,
                },
            };
        }
    );
};

export default MessagesApp;

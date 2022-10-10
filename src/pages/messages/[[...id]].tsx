import { GetServerSideProps } from 'next';
import { useEffect } from 'react';

import fetcher from '@/shared/http/fetcher';
import { getLoggedUserId } from '@/d_users/get-connected-user/utils/getLoggedInUser';
import useConversations from '@/d_conversations/list-conversations/hooks/useConversations';
import useUsers from '@/d_users/list-users/hooks/useUsers';

export const Messages = ({ conversations, users, currentConversationId }) => {
    const { getConversations, getCurrentConversation } = useConversations();
    const { getUsers } = useUsers();

    useEffect(() => {
        getConversations(conversations);
        getUsers(users);
        if (currentConversationId) getCurrentConversation(currentConversationId);
    }, [conversations, currentConversationId]);
};

export const getServerSideProps: GetServerSideProps = (context) => {
    const {
        params: { id },
    } = context;

    const loggedUserId = getLoggedUserId();

    const conversationsPromise = fetcher.get(`/conversations/${loggedUserId}`);
    const usersPromise = fetcher.get('/users');

    return Promise.all([conversationsPromise, usersPromise]).then(
        ([conversationsResponse, usersResponse]) => {
            const conversations = conversationsResponse.data;
            const users = usersResponse.data;

            return {
                props: {
                    conversations,
                    users,
                    currentConversationId: id ?? null,
                },
            };
        }
    );
};

export default Messages;

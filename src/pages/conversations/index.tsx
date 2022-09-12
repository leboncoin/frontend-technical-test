import React, { FC, useContext, useEffect, useState } from 'react';
import ConversationList from '@/components/ConversationList/ConversationList';
import { getConversations } from '@/services/conversations';
import { UserContext } from 'src/context/user.context';
import { Conversation } from 'src/types/conversation';
import { User } from 'src/types/user';
import { getAllUsers } from '@/services/user';

const ConversationsPage: FC = () => {
  const userId = useContext(UserContext);
  const [conversationList, setConversationList] = useState<Conversation[]>([]);
  const [userList, setUserList] = useState<User[]>([])

  useEffect(() => {
    const getConversationList = async () => {
      const response = await getConversations(userId);
      setConversationList(response);
    };
    getConversationList();
  }, [userId]);

    useEffect(() => {
      const getUsers = async () => {
        const response = await getAllUsers();
        setUserList(response);
      };
      getUsers();
    }, []);

  return (
    <div className="w-full h-auto p-8">
      <div className="container flex justify-center mx-auto">
        {conversationList.length > 0 ? (
          <ConversationList list={conversationList} />
        ) : (
          <div className="flex items-center justify-center h-screen font-bold text-orange-500">
            <p>Vous n&apos;avez pas encore de conversations</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversationsPage;

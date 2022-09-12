import React, { FC, useContext, useEffect, useState } from 'react';
import ConversationList from '@/components/ConversationList/ConversationList';
import { getConversations, newConversation } from '@/services/conversations';
import { UserContext } from 'src/context/user.context';
import { Conversation } from 'src/types/conversation';
import { User } from 'src/types/user';
import { getAllUsers } from '@/services/user';
import Avatar from '@/components/ConversationList/Avatar';
import { useRouter } from 'next/router';
import AvailableUserList from '@/components/AvailableUserList/AvailableUserList';
import { ERROR_MESSAGE_1 } from '@/utils/constants';

const ConversationsPage: FC = () => {
  const userId = useContext(UserContext);
  const router = useRouter();
  const [conversationList, setConversationList] = useState<Conversation[]>([]);
  const [userList, setUserList] = useState<User[]>([]);
  const [refetch, setRefetch] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    try {
      if (userId) {
        const getConversationList = async () => {
          const response = await getConversations(userId);
          setConversationList(response);
        };
        getConversationList();
      }
    } catch {
      setErrorMessage(ERROR_MESSAGE_1);
    }
  }, [userId, refetch]);

  useEffect(() => {
    try {
      const getUsers = async () => {
        const response = await getAllUsers();
        setUserList(response);
      };
      getUsers();
    } catch {
      setErrorMessage(ERROR_MESSAGE_1);
    }
  }, []);

  const handleCreateNewConversation = async (
    userId: number,
    recipientId: number,
    recipientNickname: string
  ): Promise<void> => {
    try {
      const conversationCreated = await newConversation(userId, recipientId, recipientNickname);
      router.push(`/conversations/${conversationCreated.id}/${conversationCreated.recipientId}`);
      setRefetch(true);
    } catch (e) {
      console.log(e);
    }
  };

  const availableUsers = (userList: User[]): User[] => {
    const newUserList = [];
    userList.forEach((user: User) => {
      if (!conversationList.find((conversation) => conversation.recipientId === user.id)) {
        newUserList.push(user);
      }
    });
    return newUserList;
  };

  if (errorMessage) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <p className="font-bold text-orange-500">{errorMessage}</p>
      </div>
    );
  }

  return (
    <div className="w-full h-auto ">
      <div className="container flex justify-start">
        <AvailableUserList
          userList={availableUsers(userList)}
          userId={userId}
          handleCreateConversation={handleCreateNewConversation}
        />
        {conversationList.length > 0 ? (
          <ConversationList list={conversationList} />
        ) : (
          <div className="flex items-center justify-center w-full h-screen font-bold text-orange-500">
            <p>Vous n&apos;avez pas encore de conversations</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversationsPage;

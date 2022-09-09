import ConversationList from '@/components/ConversationList/ConversationList';
import { getConversations } from '@/services/conversations';
import React, { FC, useContext, useEffect, useState } from 'react';
import { UserContext } from 'src/context/user.context';
import { Conversation } from 'src/types/conversation';

const ConversationsPage: FC = () => {
  const userId = useContext(UserContext);
  const [conversationList, setConversationList] = useState<Conversation[]>([]);

  useEffect(() => {
    const getConversationList = async () => {
      const response = await getConversations(userId);
      setConversationList(response);
    };
    getConversationList();
  }, [userId]);

console.log(conversationList)
  return (
    <div className="w-full h-auto p-10">
      <div className="container flex justify-center mx-auto">
        <ConversationList list={conversationList}/>
      </div>
    </div>
  );
};

export default ConversationsPage;

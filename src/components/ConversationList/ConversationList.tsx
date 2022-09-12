import React, { FC } from 'react';
import { Conversation } from 'src/types/conversation';
import ConversationCard from './ConversationCard';

interface ConversationListProps {
  list: Conversation[];
}

const ConversationList: FC<ConversationListProps> = ({ list }: ConversationListProps) => {
  return (
    <div className="flex flex-col items-center w-full h-screen space-y-6">
      {list.map((conversation: Conversation, index: number) => {
        return <ConversationCard key={index} conversation={conversation} />;
      })}
    </div>
  );
};

export default React.memo(ConversationList);

import { toDayAndMonth } from '@/utils/functions';
import router from 'next/router';
import Router from 'next/router';
import React, { FC } from 'react';
import { Conversation } from 'src/types/conversation';
import Avatar from './Avatar';

interface ConversationCardProps {
  conversation: Conversation;
}

const ConversationCard: FC<ConversationCardProps> = ({ conversation }: ConversationCardProps) => {
  const handleClick = (conversationId: number): void => {
    router.push(`/conversations/${conversationId}`)
  }
  return (
    <div onClick={() => handleClick(conversation.id)} className="flex flex-row items-center w-full h-24 p-12 shadow-lg cursor-pointer md:w-3/5 rounded-xl">
      <div className="flex justify-between w-3/4 md:w-2/5">
        <Avatar userName={conversation.senderNickname} />
        <div className="flex flex-col ">
          <p className="text-2xl text-black">{conversation.senderNickname}</p>
          <p className="text-slate-500">{toDayAndMonth(conversation.lastMessageTimestamp)}</p>
        </div>
      </div>
    </div>
  );
};

export default ConversationCard;

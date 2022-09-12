import { toDateString } from '@/utils/functions';
import React, { FC } from 'react';

interface ChatHeadProps {
  recipientName: string;
  lastMessagetimestamp: number;
}

const ChatHead: FC<ChatHeadProps> = ({ recipientName, lastMessagetimestamp }: ChatHeadProps) => {
  return (
    <div className="flex flex-row items-center justify-between w-full h-16 p-4 text-white bg-orange-500">
      <p className="font-bold">{recipientName} - vous</p>
      {lastMessagetimestamp !== 0 && (
        <p className="invisible font-bold md:visible">Dernier message: {toDateString(lastMessagetimestamp)}</p>
      )}
    </div>
  );
};

export default ChatHead;

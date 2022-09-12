import React, { FC } from 'react';
import { Message } from 'src/types/message';
import ChatContent from './ChatContent';
import ChatHead from './ChatHead';

interface ChatProps {
  recipientNickname: string;
  messagesList: Message[];
}

const Chat: FC<ChatProps> = ({ recipientNickname, messagesList }: ChatProps) => {
  return (
    <div className="w-full h-full">
      <ChatHead recipientName={recipientNickname} lastMessagetimestamp={messagesList.at(-1)?.timestamp ?? 0} />
      <ChatContent messagesList={messagesList} recipientNickname={recipientNickname} />
    </div>
  );
};

export default Chat;

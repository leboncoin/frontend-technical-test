import React, { FC, useContext } from 'react';
import { UserContext } from 'src/context/user.context';
import { Message } from 'src/types/message';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';

interface ChatContentProps {
  messagesList: Message[];
  recipientNickname: string;
}

const ChatContent: FC<ChatContentProps> = ({ messagesList }: ChatContentProps) => {
  const userId = useContext(UserContext);

  if (messagesList.length > 0) {
    return (
      <div className="flex flex-col items-end justify-end w-full p-5 space-y-10 h-4/5">
        {messagesList.map((message: Message, index: number) => {
          return <MessageBubble key={index} body={message.body} isFromMe={userId === message.authorId} />;
        })}

        <div className="flex justify-center w-full">
          <MessageInput />
        </div>
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center w-full font-bold text-orange-500 h-4/5">
      <p>Vous n&apos;avez pas encore de messages</p>
    </div>
  );
};

export default ChatContent;

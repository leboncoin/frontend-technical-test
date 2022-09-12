import React, { FC } from 'react';

interface MessageBubbleProps {
  body: string;
  isFromMe: boolean;
}

const MessageBubble: FC<MessageBubbleProps> = ({ body, isFromMe }: MessageBubbleProps) => {
  if (isFromMe) {
    return (
      <div className="flex-row items-center justify-center p-4 text-white bg-orange-500 h-18 rounded-2xl">{body}</div>
    );
  }
  return (
    <div className="flex flex-col items-start space-y-2">
      <p className="text-slate-500">Jane</p>
      <div className="flex-row items-center justify-center p-4 mr-10 text-black h-18 bg-slate-300 rounded-2xl">
        {body}
      </div>
    </div>
  );
};

export default MessageBubble;

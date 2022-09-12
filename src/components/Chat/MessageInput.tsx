import React from 'react';
import Image from 'next/image';

import sendIcon from '../../assets/send.svg';

const MessageInput = () => {
  return (
    <div className="flex flex-row justify-center w-full">
      <input placeholder="Envoyer un message" className="w-full p-4 border border-gray-400 rounded-2xl form-input" />
      <Image width={30} height={30} src={sendIcon.src} className="cursor-pointer" alt="Send Icon" />
    </div>
  );
};

export default MessageInput;

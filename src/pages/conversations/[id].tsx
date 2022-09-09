import { useRouter } from 'next/router';
import React from 'react';

const ChatPage = () => {
  const { id } = useRouter().query;
  return <div>ChatPage</div>;
};

export default ChatPage;

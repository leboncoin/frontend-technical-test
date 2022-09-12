import React, { useEffect, useState } from 'react';
import Chat from '@/components/Chat/Chat';
import { getMessagesList } from '@/services/messages';
import { useRouter } from 'next/router';
import { Message } from 'src/types/message';
import { User } from 'src/types/user';
import { getUser } from '@/services/user';

const ChatPage = () => {
  const router = useRouter();
  const { id, recipientId } = router.query;
  const [messagesList, setMessagesList] = useState<Message[]>([]);
  const [recipient, setRecipient] = useState<User>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    if (id) {
      try {
        const fetchMessagesList = async () => {
          const response = await getMessagesList(id as string);
          setMessagesList(response);
        };
        fetchMessagesList();
      } catch (e) {
        setErrorMessage('Oups! Il semblerait que Laurent notre Sys-Admin se soit pris les pieds dans un cable, il va arranger ça rapidement!')
      }
    }
  }, [id]);

  useEffect(() => {
    if (recipientId) {
       try {
         const fetchUser = async () => {
           const response = await getUser(recipientId as string);
           setRecipient(response[0]);
         };
         fetchUser();
       } catch (e) {
         setErrorMessage(
           'Oups! Il semblerait que Laurent notre Sys-Admin se soit pris les pieds dans un cable, il va arranger ça rapidement!'
         );
       }
    }
  }, [recipientId]);

  if(errorMessage){
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <p className='font-bold text-orange-500'>{errorMessage}</p>
      </div>
    );
  }

  return (
    <div className="w-full h-screen">
      <div className="container flex justify-center h-full mx-auto">
        <Chat recipientNickname={recipient?.nickname} messagesList={messagesList} />
      </div>
    </div>
  );
};

export default ChatPage;

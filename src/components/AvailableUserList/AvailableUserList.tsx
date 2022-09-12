import React, { FC } from 'react'
import { User } from 'src/types/user';
import Avatar from '../ConversationList/Avatar';

interface AvailableUserListProps {
    userList: User[];
    userId: number;
    handleCreateConversation: (senderId: number, recipientId: number, recipientNickname ) => void
}

const AvailableUserList: FC<AvailableUserListProps>= ({
    userList, userId, handleCreateConversation
}: AvailableUserListProps) => {

    
  return (
          <div className="flex flex-col items-center w-1/4 h-screen pt-2 space-y-8 shadow-l md:w-2/5 md:p-6">
          <p className='text-xs font-bold text-center text-orange-500 md:text-lg'>Contact dispo</p>
          {userList.map((user: User, index: number) => {
            return (
              <div
                onClick={() => handleCreateConversation(userId, user.id, user.nickname)}
                key={index}
                className="flex flex-col items-center justify-center w-full p-2 border-b-2 cursor-pointer md:flex-row md:space-x-4 h-18"
              >
                <Avatar userName={user.nickname} />
                <p className='text-sm md:text-lg'>{user.nickname}</p>
              </div>
            );
          })}
        </div>
  )
}

export default AvailableUserList
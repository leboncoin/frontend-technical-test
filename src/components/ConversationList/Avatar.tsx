import React, { FC } from 'react';
import Image from 'next/image';
import { displayFirstLetter } from '@/utils/functions';

interface AvatarProps {
  image?: string;
  userName: string;
}

const Avatar: FC<AvatarProps> = ({ image, userName }: AvatarProps) => {
  if (image) {
    return <Image layout="fill" className="w-3 h-3 rounded-lg" src="image" alt="user" />;
  }

  return (
    <div
      className={`flex items-center justify-center w-10 h-10 text-lg font-bold text-white bg-pink-500 rounded-full md:h-16 md:w-16`}
    >
      {displayFirstLetter(userName)}
    </div>
  );
};

export default Avatar;

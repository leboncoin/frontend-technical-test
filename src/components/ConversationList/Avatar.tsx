import React, { FC } from 'react';
import Image from 'next/image';

interface AvatarProps {
  image?: string;
  userName: string;
}

const Avatar: FC<AvatarProps> = ({ image }: AvatarProps) => {
  if (image) {
    return (
      <Image src="image" alt="user ">
        Avatar
      </Image>
    );
  }

  return <div></div>;
};

export default Avatar;

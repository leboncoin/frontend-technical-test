import type { ReactElement } from 'react';
import { getUserInitial } from '../utils/messagingView';
import styles from '../styles/Home.module.css';

interface AvatarProps {
  nickname: string;
  className?: string;
}

export const Avatar = ({
  nickname,
  className = styles.avatar,
}: AvatarProps): ReactElement => {
  return (
    <span className={className} aria-hidden="true">
      {getUserInitial(nickname)}
    </span>
  );
};

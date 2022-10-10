import { FC } from 'react';
import Picture from '@/shared/design-systems/Picture';

import styles from './MessageItem.module.sass';

type MessageItemProps = {
    picture: string;
    nickname: string;
    content: string;
    isSender: boolean;
};

const MessageItem: FC<MessageItemProps> = ({
    picture,
    nickname,
    content,
    isSender,
}: MessageItemProps) => (
    <div className={styles.messageItem}>
        {!isSender && <Picture src={picture} alt={nickname} className={styles.pictureSpace} />}
        <p className={[styles.content, isSender ? styles.isSender : ''].join(' ')}>{content}</p>
    </div>
);

export default MessageItem;

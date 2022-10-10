import { FC } from 'react';
import Picture from '@/shared/design-systems/Picture';

import styles from './MessageItem.module.sass';

export type MessageItemProps = {
    id?: number;
    picture: string;
    nickname: string;
    content: string;
    loggedIsSender: boolean;
};

const MessageItem: FC<MessageItemProps> = ({
    picture,
    nickname,
    content,
    loggedIsSender,
}: MessageItemProps) => (
    <div className={[styles.messageItem, loggedIsSender ? styles.loggedIsSender : ''].join(' ')}>
        {!loggedIsSender && (
            <Picture src={picture} alt={nickname} className={styles.pictureSpace} />
        )}
        <p className={styles.content}>{content}</p>
    </div>
);

export default MessageItem;

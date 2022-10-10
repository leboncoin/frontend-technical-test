import { FC } from 'react';

import Picture from '@/shared/design-systems/Picture';

import styles from './ConversationItem.module.sass';

export type ConversationItemProps = {
    nickname: string;
    picture: string;
    date: number;
    selected: boolean;
    onClick: () => void;
};

const ConversationItem: FC<ConversationItemProps> = ({
    nickname,
    picture,
    date,
    selected,
    onClick,
}: ConversationItemProps) => (
    <div
        className={[styles.conversationItem, selected ? styles.selected : ''].join(' ')}
        role="link"
        tabIndex={0}
        onKeyUp={onClick}
        onClick={onClick}
        data-testid="conversation-item"
    >
        <Picture src={picture} alt={nickname} className={styles.pictureSpace} />

        <div className={styles.nicknameDate}>
            <h3 className={styles.nickname}>{nickname}</h3>
            <p className={styles.date}>{date}</p>
        </div>
    </div>
);

export default ConversationItem;

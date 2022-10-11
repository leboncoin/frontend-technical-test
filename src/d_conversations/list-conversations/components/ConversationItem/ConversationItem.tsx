import { FC } from 'react';
import { useRouter } from 'next/router';

import useConversations from '../../hooks/useConversations';

import Picture from '@/shared/design-systems/Picture';

import styles from './ConversationItem.module.sass';

export type ConversationItemProps = {
    id: number;
    nickname: string;
    picture: string;
    date: number;
    selected: boolean;
};

const ConversationItem: FC<ConversationItemProps> = ({
    id,
    nickname,
    picture,
    date,
}: ConversationItemProps) => {
    const router = useRouter();
    const { currentConversationId } = useConversations();

    const selected = id === currentConversationId;

    function onClick() {
        router.push(`/messages/${id}`);
    }

    return (
        <div
            className={[styles.conversationItem, selected ? styles.selected : ''].join(' ')}
            role="link"
            tabIndex={0}
            onKeyUp={onClick}
            onClick={onClick}
            aria-current={selected}
            data-testid="conversation-item"
        >
            <Picture src={picture} alt={nickname} className={styles.pictureSpace} />

            <div className={styles.nicknameDate}>
                <h3 className={styles.nickname}>{nickname}</h3>
                <p className={styles.date}>{date}</p>
            </div>
        </div>
    );
};

export default ConversationItem;

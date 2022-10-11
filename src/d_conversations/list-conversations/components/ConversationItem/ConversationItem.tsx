import { FC, useCallback, useRef, useState } from 'react';
import { useRouter } from 'next/router';

import useConversations from '../../hooks/useConversations';

import Picture from '@/shared/design-systems/Picture';

import styles from './ConversationItem.module.sass';
import DeleteButton from '@/shared/design-systems/DeleteButton';
import callAPI from '@/shared/http/callAPI';

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
    const [openFeedback, setOpenFeedback] = useState(false);
    const router = useRouter();
    const { currentConversationId, conversations } = useConversations();
    const stateRef = useRef<boolean>();

    stateRef.current = openFeedback;

    const selected = id === currentConversationId;

    const selectConversation = () => {
        router.push(`/messages/${id}`);
    };

    const closeFeedback = () => {
        setOpenFeedback(false);
        return stateRef.current;
    };

    const removeConversation = () => {
        callAPI
            .delete(`/conversation/${id}`)
            .then(() => {
                const previousConversation = conversations[conversations.length - 2];

                router.push(`/messages/${previousConversation.id}`);
            })
            .catch(() => {
                setOpenFeedback(true);
            });
    };

    return (
        <div
            className={[styles.conversationItem, selected ? styles.selected : ''].join(' ')}
            role="link"
            tabIndex={0}
            onKeyDown={selectConversation}
            onClick={selectConversation}
            aria-current={selected}
            data-testid="conversation-item"
        >
            <Picture src={picture} alt={nickname} className={styles.pictureSpace} />

            <div className={styles.nicknameDate}>
                <h3 className={styles.nickname}>{nickname}</h3>
                <p className={styles.date}>{date}</p>
            </div>

            <DeleteButton
                onClick={removeConversation}
                isFeedbackOpen={openFeedback}
                closeFeedback={closeFeedback}
                feedbackText={"Cette conversation n'a pas pu être supprimée"}
                className={styles.deleteButton}
            />
        </div>
    );
};

export default ConversationItem;

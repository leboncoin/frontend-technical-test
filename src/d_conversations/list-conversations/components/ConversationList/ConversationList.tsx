import useConversations from '@/d_conversations/list-conversations/hooks/useConversations';
import { FC } from 'react';

import ConversationItem from '../ConversationItem';

import styles from './ConversationList.module.sass';

type ConversationListProps = {
    className?: string;
};

const ConversationList: FC<ConversationListProps> = ({ className }: ConversationListProps) => {
    const { conversations } = useConversations();

    return (
        <div className={[styles.conversationList, className].join(' ')}>
            {conversations.map(({ id, recipientNickname, lastMessageTimestamp }) => (
                <ConversationItem
                    key={id}
                    nickname={recipientNickname}
                    date={lastMessageTimestamp}
                />
            ))}
        </div>
    );
};

export default ConversationList;

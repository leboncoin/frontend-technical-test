import useConversations from '@/d_conversations/list-conversations/hooks/useConversations';

import ConversationItem from '../ConversationItem';

import styles from './ConversationList.module.sass';

const ConversationList = () => {
    const { conversations } = useConversations();

    return (
        <div className={styles.conversationList}>
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

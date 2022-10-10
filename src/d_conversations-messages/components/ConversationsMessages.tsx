import ConversationList from '@/d_conversations/list-conversations/components/ConversationList';
import ListSendMessages from '@/d_messages/shared/components/ListSendMessages';

import styles from './ConversationsMessages.module.sass';

const ConversationsMessages = () => (
    <div className={styles.conversationsMessages}>
        <ConversationList className={styles.conversationsSpace} />
        <ListSendMessages className={styles.messagesSpace} />
    </div>
);

export default ConversationsMessages;

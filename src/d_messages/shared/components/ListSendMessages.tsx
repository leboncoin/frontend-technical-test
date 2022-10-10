import { FC } from 'react';

import MessageList from '@/d_messages/list-messages/components/MessageList/MessageList';
import SendMessage from '@/d_messages/send-message/components/SendMessage';

import styles from './ListSendMessages.module.sass';

type ListSendMessagesProps = {
    className?: string;
};

const ListSendMessages: FC<ListSendMessagesProps> = ({ className }: ListSendMessagesProps) => (
    <div className={[styles.listSendMessages, className].join(' ')}>
        <MessageList />
        <SendMessage />
    </div>
);

export default ListSendMessages;

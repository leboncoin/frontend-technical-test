import { FC } from 'react';

import useMessagesToDisplay from '../../hooks/useMessagesToDisplay';

import MessageItem from '../MessageItem';

import styles from './MessageList.module.sass';

const MessageList = () => {
    const { messagesToDisplay } = useMessagesToDisplay();
    return (
        <div className={styles.messageList}>
            {messagesToDisplay.map(({ id, nickname, content, loggedIsSender }) => (
                <MessageItem
                    key={id}
                    nickname={nickname}
                    content={content}
                    loggedIsSender={loggedIsSender}
                />
            ))}
        </div>
    );
};

export default MessageList;

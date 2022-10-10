import styles from './MessageList.module.sass';

import MessageItem from '../MessageItem';

import useMessagesToDisplay from '../../hooks/useMessagesToDisplay';

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

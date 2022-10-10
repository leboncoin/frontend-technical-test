import type { FC } from 'react';

import ConversationsMessages from '@/d_conversations-messages/components/ConversationsMessages';

import styles from '@/shared/styles/Home.module.sass';

const Home: FC = () => {
    return (
        <div className={styles.container}>
            <ConversationsMessages />
        </div>
    );
};

export default Home;

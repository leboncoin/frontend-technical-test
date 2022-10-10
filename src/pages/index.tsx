import type { FC } from 'react';

import Head from 'next/head';
import Image from 'next/image';

import Logo from '@/shared/assets/lbc-logo.webp';
import colors from '@/shared/styles/variables/colors.module.sass';
import ConversationsMessages from '@/d_conversations-messages/components/ConversationsMessages';

import styles from '@/shared/styles/Home.module.sass';

const Home: FC = () => {
    const year = new Date().getFullYear();

    return (
        <div className={styles.container}>
            <ConversationsMessages />
        </div>
    );
};

export default Home;

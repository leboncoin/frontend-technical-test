import type { FormEvent, ReactElement } from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import { Avatar } from '../components/Avatar';
import { ConversationList } from '../components/ConversationList';
import { MessageComposer } from '../components/MessageComposer';
import { MessageThread } from '../components/MessageThread';
import { NewConversationForm } from '../components/NewConversationForm';
import type { Conversation } from '../types/conversation';
import type { LoadState } from '../types/loadState';
import type { Message } from '../types/message';
import type { User } from '../types/user';
import { getLoggedUserId } from '../utils/getLoggedUserId';
import {
  MAX_MESSAGE_LENGTH,
  sanitizeMessageDraft,
} from '../utils/messageSafety';
import {
  createConversation,
  getConversations,
  getMessages,
  getUsers,
  sendMessage,
} from '../utils/messagingApi';
import {
  filterConversationsByParticipant,
  filterRecipientsByQuery,
  findConversationWithParticipant,
  findSelectedRecipient,
  getAvailableRecipients,
  getConversationParticipant,
  sortConversations,
  sortMessages,
} from '../utils/messagingView';
import styles from '../styles/Home.module.css';

const REFRESH_INTERVAL_MS = 15000;
const loggedUserId = getLoggedUserId();

type LoadOptions = {
  silent?: boolean;
};

const Home = (): ReactElement => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedConversationId, setSelectedConversationId] = useState<
    number | null
  >(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversationState, setConversationState] = useState<LoadState>('idle');
  const [messageState, setMessageState] = useState<LoadState>('idle');
  const [userState, setUserState] = useState<LoadState>('idle');
  const [conversationSearch, setConversationSearch] = useState('');
  const [newConversationRecipientQuery, setNewConversationRecipientQuery] =
    useState('');
  const [isCreatingConversation, setIsCreatingConversation] = useState(false);
  const [createConversationError, setCreateConversationError] = useState<
    string | null
  >(null);
  const [draft, setDraft] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [isThreadVisibleOnMobile, setIsThreadVisibleOnMobile] = useState(false);

  const orderedConversations = useMemo(
    () => sortConversations(conversations),
    [conversations]
  );
  const filteredConversations = useMemo(
    () =>
      filterConversationsByParticipant(
        orderedConversations,
        conversationSearch,
        loggedUserId
      ),
    [conversationSearch, orderedConversations]
  );
  const selectedConversation = useMemo(
    () =>
      orderedConversations.find(
        (conversation) => conversation.id === selectedConversationId
      ) ?? null,
    [orderedConversations, selectedConversationId]
  );
  const selectedParticipant = selectedConversation
    ? getConversationParticipant(selectedConversation, loggedUserId)
    : null;
  const orderedMessages = useMemo(() => sortMessages(messages), [messages]);
  const availableRecipients = useMemo(
    () => getAvailableRecipients(users, loggedUserId),
    [users]
  );
  const matchingRecipients = useMemo(
    () =>
      filterRecipientsByQuery(
        availableRecipients,
        newConversationRecipientQuery
      ),
    [availableRecipients, newConversationRecipientQuery]
  );
  const selectedRecipient = useMemo(
    () =>
      findSelectedRecipient(
        availableRecipients,
        matchingRecipients,
        newConversationRecipientQuery
      ),
    [availableRecipients, matchingRecipients, newConversationRecipientQuery]
  );
  const hasExactRecipientMatch =
    selectedRecipient !== null &&
    selectedRecipient.nickname.toLowerCase() ===
      newConversationRecipientQuery.trim().toLowerCase();
  const existingConversationForSelectedRecipient = selectedRecipient
    ? findConversationWithParticipant(
        orderedConversations,
        selectedRecipient.id,
        loggedUserId
      )
    : null;
  const shouldShowRecipientSuggestions =
    userState === 'success' &&
    newConversationRecipientQuery.trim().length > 0 &&
    matchingRecipients.length > 0 &&
    !hasExactRecipientMatch;
  const canCreateConversation =
    userState === 'success' &&
    selectedRecipient !== null &&
    matchingRecipients.length > 0 &&
    !isCreatingConversation;
  const loggedUser = users.find((user) => user.id === loggedUserId) ?? {
    id: loggedUserId,
    nickname: `Utilisateur ${loggedUserId}`,
    token: '',
  };
  const draftValidation = sanitizeMessageDraft(draft);
  const isDraftTooLong = draftValidation.isTooLong;
  const canSend =
    draftValidation.isValid &&
    !isSending &&
    selectedConversation !== null &&
    messageState === 'success';

  const loadConversations = useCallback(async (options?: LoadOptions) => {
    if (!options?.silent) {
      setConversationState('loading');
    }

    try {
      const result = sortConversations(await getConversations(loggedUserId));

      setConversations(result);
      setConversationState('success');
      setSelectedConversationId((currentId) => {
        if (
          currentId !== null &&
          result.some((conversation) => conversation.id === currentId)
        ) {
          return currentId;
        }

        return result[0]?.id ?? null;
      });
    } catch {
      setConversationState('error');
    }
  }, []);

  const loadUsers = useCallback(async () => {
    setUserState('loading');

    try {
      const result = await getUsers();

      setUsers(result);
      setUserState('success');
    } catch {
      setUserState('error');
    }
  }, []);

  const retryInitialData = (): void => {
    void loadConversations();
    void loadUsers();
  };

  const loadMessages = useCallback(
    async (conversationId: number, options?: LoadOptions) => {
      if (!options?.silent) {
        setMessageState('loading');
      }
      setSendError(null);

      try {
        setMessages(sortMessages(await getMessages(conversationId)));
        setMessageState('success');
      } catch {
        if (!options?.silent) {
          setMessages([]);
        }
        setMessageState('error');
      }
    },
    []
  );

  useEffect(() => {
    void loadConversations();
  }, [loadConversations]);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      void loadConversations({ silent: true });
    }, REFRESH_INTERVAL_MS);

    return () => window.clearInterval(intervalId);
  }, [loadConversations]);

  useEffect(() => {
    void loadUsers();
  }, [loadUsers]);

  useEffect(() => {
    if (selectedConversationId === null) {
      setMessages([]);
      setMessageState('idle');
      return;
    }

    void loadMessages(selectedConversationId);
  }, [loadMessages, selectedConversationId]);

  useEffect(() => {
    if (selectedConversationId === null) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      void loadMessages(selectedConversationId, { silent: true });
    }, REFRESH_INTERVAL_MS);

    return () => window.clearInterval(intervalId);
  }, [loadMessages, selectedConversationId]);

  const handleSelectConversation = (conversationId: number): void => {
    setSelectedConversationId(conversationId);
    setIsThreadVisibleOnMobile(true);
  };

  const handleCreateConversation = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    const recipient = selectedRecipient;

    if (recipient === null || isCreatingConversation) {
      return;
    }

    if (existingConversationForSelectedRecipient !== null) {
      setSelectedConversationId(existingConversationForSelectedRecipient.id);
      setNewConversationRecipientQuery('');
      setCreateConversationError(null);
      setIsThreadVisibleOnMobile(true);
      return;
    }

    const lastMessageTimestamp = Math.floor(Date.now() / 1000);
    const nextConversation = {
      recipientId: recipient.id,
      recipientNickname: recipient.nickname,
      senderId: loggedUser.id,
      senderNickname: loggedUser.nickname,
      lastMessageTimestamp,
      lastMessageBody: '',
    };

    setIsCreatingConversation(true);
    setCreateConversationError(null);

    try {
      const createdConversation = await createConversation(
        loggedUserId,
        nextConversation
      );
      const conversation = {
        id: createdConversation.id,
        ...nextConversation,
      };

      setConversations((currentConversations) =>
        sortConversations([conversation, ...currentConversations])
      );
      setSelectedConversationId(createdConversation.id);
      setMessages([]);
      setMessageState('success');
      setDraft('');
      setNewConversationRecipientQuery('');
      setIsThreadVisibleOnMobile(true);
    } catch {
      setCreateConversationError(
        'La conversation n’a pas pu être créée. Vous pouvez réessayer.'
      );
    } finally {
      setIsCreatingConversation(false);
    }
  };

  const handleSendMessage = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    if (!canSend || selectedConversation === null) {
      return;
    }

    const body = draftValidation.body;
    const timestamp = Math.floor(Date.now() / 1000);

    setIsSending(true);
    setSendError(null);

    try {
      const createdMessage = await sendMessage(
        selectedConversation.id,
        loggedUserId,
        body,
        timestamp
      );
      const nextMessage: Message = {
        id: createdMessage.id,
        conversationId: selectedConversation.id,
        authorId: loggedUserId,
        timestamp,
        body,
      };

      setMessages((currentMessages) =>
        sortMessages([...currentMessages, nextMessage])
      );
      setConversations((currentConversations) =>
        sortConversations(
          currentConversations.map((conversation) =>
            conversation.id === selectedConversation.id
              ? {
                  ...conversation,
                  lastMessageTimestamp: timestamp,
                  lastMessageBody: body,
                }
              : conversation
          )
        )
      );
      setDraft('');
    } catch {
      setSendError(
        'Votre message n’a pas pu être envoyé. Vous pouvez réessayer.'
      );
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Messages - leboncoin</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Consultez et envoyez vos messages leboncoin."
        />
      </Head>

      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>leboncoin</p>
          <h1 className={styles.title}>Messages</h1>
        </div>
        <div className={styles.currentUser} aria-label="Utilisateur connecté">
          <Avatar
            nickname={loggedUser.nickname}
            className={styles.currentUserAvatar}
          />
          <span>{loggedUser.nickname}</span>
        </div>
      </header>

      <main className={styles.shell}>
        <section
          className={`${styles.sidebar} ${isThreadVisibleOnMobile ? styles.sidebarHiddenMobile : ''}`}
          aria-labelledby="conversation-list-title"
        >
          <div className={styles.panelHeader}>
            <h2 id="conversation-list-title">Conversations</h2>
          </div>

          <div className={styles.searchBox}>
            <label className={styles.srOnly} htmlFor="conversation-search">
              Rechercher
            </label>
            <div className={styles.searchField}>
              <svg
                className={styles.searchIcon}
                aria-hidden="true"
                viewBox="0 0 24 24"
              >
                <path d="m21 21-4.35-4.35" />
                <circle cx="11" cy="11" r="7" />
              </svg>
              <input
                className={styles.searchInput}
                id="conversation-search"
                onChange={(event) => setConversationSearch(event.target.value)}
                placeholder="Rechercher nom du contact"
                type="search"
                value={conversationSearch}
              />
            </div>
          </div>

          <ConversationList
            conversations={filteredConversations}
            conversationState={conversationState}
            loggedUserId={loggedUserId}
            selectedConversationId={selectedConversationId}
            totalConversationCount={orderedConversations.length}
            onRetry={retryInitialData}
            onSelectConversation={handleSelectConversation}
          />

          <NewConversationForm
            availableRecipientsCount={availableRecipients.length}
            canCreateConversation={canCreateConversation}
            createConversationError={createConversationError}
            isCreatingConversation={isCreatingConversation}
            matchingRecipients={matchingRecipients}
            query={newConversationRecipientQuery}
            shouldShowSuggestions={shouldShowRecipientSuggestions}
            userState={userState}
            onQueryChange={setNewConversationRecipientQuery}
            onRetryUsers={loadUsers}
            onSelectRecipient={setNewConversationRecipientQuery}
            onSubmit={handleCreateConversation}
          />
        </section>

        <MessageThread
          isVisibleOnMobile={isThreadVisibleOnMobile}
          loggedUserId={loggedUserId}
          messageState={messageState}
          messages={orderedMessages}
          participant={selectedParticipant}
          selectedConversationId={selectedConversationId}
          onBack={() => setIsThreadVisibleOnMobile(false)}
          onRetryMessages={(conversationId) => loadMessages(conversationId)}
        >
          <MessageComposer
            canSend={canSend}
            draft={draft}
            isDraftTooLong={isDraftTooLong}
            isSending={isSending}
            maxLength={MAX_MESSAGE_LENGTH}
            messageState={messageState}
            sendError={sendError}
            onDraftChange={setDraft}
            onSubmit={handleSendMessage}
          />
        </MessageThread>
      </main>
    </div>
  );
};

export default Home;

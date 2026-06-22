import Head from 'next/head'
import { ConversationList } from '../ConversationList'
import { MessageThread } from '../MessageThread'
import { NewConversationModal } from '../NewConversationModal'
import { Layout } from '../Layout'
import { useMessagesPage } from './useMessagesPage'

export const MessagesPage = () => {
  const {
    loggedUserId,
    selectedId,
    selectedConversation,
    isModalOpen,
    setIsModalOpen,
    isDesktop,
    showList,
    showThread,
    contactName,
    handleSelect,
    handleBack,
    handleCreated,
  } = useMessagesPage()

  const listPaneClass = isDesktop
    ? 'flex h-full w-[380px] max-w-[380px] shrink-0 flex-col'
    : showList
      ? 'mx-auto flex h-full w-full max-w-[720px] flex-col'
      : 'hidden'

  const threadPaneClass = isDesktop
    ? 'flex h-full min-w-0 flex-1 flex-col border-l border-neutral-200'
    : 'flex h-full w-full min-w-0 flex-1 flex-col'

  return (
    <Layout>
      <Head>
        <title>Messages - leboncoin</title>
        <meta name="description" content="View and send your leboncoin messages" />
      </Head>

      <div className="flex h-[calc(100vh-57px)] min-h-0 w-full">
        <div className={listPaneClass}>
          <ConversationList
            loggedUserId={loggedUserId}
            selectedId={selectedId}
            onSelect={handleSelect}
            onNewConversation={() => setIsModalOpen(true)}
          />
        </div>

        {showThread && selectedConversation ? (
          <div className={threadPaneClass}>
            <MessageThread
              conversation={selectedConversation}
              loggedUserId={loggedUserId}
              contactName={contactName}
              authorName={contactName}
              onBack={isDesktop ? undefined : handleBack}
            />
          </div>
        ) : (
          isDesktop && (
            <div className="flex flex-1 items-center justify-center border-l border-neutral-200 text-[0.95rem] text-neutral-400">
              Select a conversation to get started
            </div>
          )
        )}
      </div>

      <NewConversationModal
        loggedUserId={loggedUserId}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreated={handleCreated}
      />
    </Layout>
  )
}

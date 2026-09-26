import type { ReactElement } from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Logo from '@/assets/lbc-logo.webp'
import { getLoggedUserId } from '@utils/getLoggedUserId'
import { sendMessage } from '@api/messages'
import { useConversations } from '@hooks/useConversations'
import { useConversationMessages } from '@hooks/useConversationMessages'
import { useMediaQuery } from '@hooks/useMediaQuery'
import {
  MOBILE_BREAKPOINT_QUERY,
  NEW_CONVERSATION_BUTTON_ID,
  conversationButtonId,
} from '@constants/layout'
import ConversationList from '@components/conversation-list'
import ConversationPanel from '@components/conversation-panel'
import NewConversationDialog from '@components/new-conversation-dialog'
import styles from './messaging.module.css'

/**
 * Messaging screen — the single stateful composition point.
 *
 * Layout: two panes on desktop (inbox + conversation), one pane on mobile
 * (CSS switches visibility with data-view). All async work is delegated to
 * the two hooks; this component only wires selections, sends and focus.
 */
export default function Messaging(): ReactElement {
  const currentUserId = getLoggedUserId()
  const {
    conversations,
    status,
    error,
    retry,
    upsertConversation,
    touchConversation,
  } = useConversations(currentUserId)
  const { byConversation, loadMessages, appendMessage } =
    useConversationMessages()

  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const isMobile = useMediaQuery(MOBILE_BREAKPOINT_QUERY)

  const selectedConversation =
    conversations.find((conversation) => conversation.id === selectedId) ??
    null

  const listRef = useRef<HTMLElement>(null)
  const panelRef = useRef<HTMLElement>(null)
  // Conversation whose list button should regain focus (back navigation /
  // after creating a conversation). Cleared once consumed.
  const focusConversationRef = useRef<number | null>(null)
  // Per-conversation send guard: a second submit for the same conversation
  // is ignored while its POST is in flight (belt and braces for the
  // composer's disabled state — never auto-retried).
  const sendingRef = useRef<Set<number>>(new Set())

  const handleSelect = useCallback(
    (conversationId: number) => {
      setSelectedId(conversationId)
      loadMessages(conversationId)
    },
    [loadMessages]
  )

  const handleSend = useCallback(
    async (conversationId: number, text: string): Promise<boolean> => {
      if (sendingRef.current.has(conversationId)) return false
      sendingRef.current.add(conversationId)
      try {
        const sent = await sendMessage(conversationId, currentUserId, text)
        // Both updates are keyed by conversation id, so they are safe even
        // if the user switched conversations while the POST was in flight.
        appendMessage(conversationId, sent)
        touchConversation(conversationId, sent.timestamp)
        return true
      } catch {
        return false // draft is preserved by the composer
      } finally {
        sendingRef.current.delete(conversationId)
      }
    },
    [appendMessage, currentUserId, touchConversation]
  )

  const handleBack = useCallback(() => {
    focusConversationRef.current = selectedId
    setSelectedId(null)
  }, [selectedId])

  const handleDialogClose = useCallback(() => {
    setDialogOpen(false)
    const newButton = document.getElementById(NEW_CONVERSATION_BUTTON_ID)
    if (newButton instanceof HTMLElement) newButton.focus()
    else listRef.current?.focus()
  }, [])

  // Restore focus to the relevant conversation button after back
  // navigation or conversation creation (sensible focus destination,
  // especially on mobile where the list pane just became visible again).
  useEffect(() => {
    if (focusConversationRef.current === null) return
    const targetId = focusConversationRef.current
    focusConversationRef.current = null
    const button = document.getElementById(conversationButtonId(targetId))
    if (button instanceof HTMLElement) button.focus()
    else listRef.current?.focus()
  }, [selectedId, conversations])

  // On mobile, moving into the conversation pane announces it: focus lands
  // on the panel container (tabIndex -1) instead of being dropped.
  useEffect(() => {
    if (selectedId !== null && isMobile) panelRef.current?.focus()
  }, [selectedId, isMobile])

  return (
    <div className={styles.shell}>
      <Head>
        <title>Messages - Leboncoin</title>
        <meta
          name="description"
          content="Consult your conversations and send messages"
        />
      </Head>

      <header className={styles.appHeader}>
        <Image
          src={Logo}
          alt="Leboncoin"
          width={90}
          height={28}
          priority
        />
      </header>

      <main
        className={styles.layout}
        data-view={selectedConversation !== null ? 'conversation' : 'list'}
      >
        <div className={styles.listPane}>
          <ConversationList
            ref={listRef}
            conversations={conversations}
            status={status}
            error={error}
            selectedConversationId={selectedId}
            currentUserId={currentUserId}
            onSelect={handleSelect}
            onRetry={retry}
            onCreate={() => setDialogOpen(true)}
          />
        </div>

        <div className={styles.conversationPane}>
          {selectedConversation !== null ? (
            <ConversationPanel
              key={selectedConversation.id}
              ref={panelRef}
              conversation={selectedConversation}
              state={byConversation[selectedConversation.id]}
              currentUserId={currentUserId}
              onRetryMessages={loadMessages}
              onSend={handleSend}
              onBack={handleBack}
            />
          ) : (
            <div className={styles.placeholder}>
              <p className={styles.placeholderText}>
                Select a conversation to read and send messages.
              </p>
            </div>
          )}
        </div>
      </main>

      {dialogOpen && (
        <NewConversationDialog
          currentUserId={currentUserId}
          onCreated={(conversation) => {
            upsertConversation(conversation)
            focusConversationRef.current = conversation.id
            setDialogOpen(false)
            handleSelect(conversation.id)
          }}
          onClose={handleDialogClose}
        />
      )}
    </div>
  )
}

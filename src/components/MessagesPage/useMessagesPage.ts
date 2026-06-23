import { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import { useConversationsQuery } from '@/api/queries'
import { canAccessConversation, getContactNickname } from '@/lib/conversation'
import { loggedUserId } from '@/pages/_app'
import { validateId } from '@/lib/safety/validateId'

export const useMessagesPage = () => {
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)

  const selectedId = useMemo(() => {
    const raw = router.query.id
    const value = Array.isArray(raw) ? raw[0] : raw
    return validateId(value ?? null)
  }, [router.query.id])

  const { data: conversations = [], refetch } = useConversationsQuery(loggedUserId)

  const selectedConversation = useMemo(
    () => conversations.find((c) => c.id === selectedId) ?? null,
    [conversations, selectedId]
  )

  useEffect(() => {
    const media = window.matchMedia('(min-width: 1024px)')
    const update = () => setIsDesktop(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (!router.isReady) return
    const raw = router.query.id
    const value = Array.isArray(raw) ? raw[0] : raw
    if (value && validateId(value) === null) {
      void router.replace('/messages', undefined, { shallow: true })
    }
  }, [router])

  useEffect(() => {
    if (!selectedConversation || !router.isReady) return
    if (!canAccessConversation(selectedConversation, loggedUserId)) {
      void router.replace('/messages', undefined, { shallow: true })
    }
  }, [selectedConversation, router])

  const handleSelect = useCallback(
    (id: number) => {
      void router.push({ pathname: '/messages', query: { id } }, undefined, {
        shallow: true,
      })
    },
    [router]
  )

  const handleBack = useCallback(() => {
    void router.push('/messages', undefined, { shallow: true })
  }, [router])

  const handleCreated = useCallback(
    (conversationId: number) => {
      void refetch()
      void handleSelect(conversationId)
    },
    [handleSelect, refetch]
  )

  const showList =
    isDesktop || selectedId === null || (selectedId !== null && selectedConversation === null)
  const showThread = selectedId !== null && selectedConversation !== null

  const contactName = selectedConversation
    ? getContactNickname(selectedConversation, loggedUserId)
    : ''

  return {
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
  }
}

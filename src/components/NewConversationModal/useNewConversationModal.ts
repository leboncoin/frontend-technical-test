import { useEffect, useRef, useState } from 'react'
import { useCreateConversationMutation } from '@/api/mutations'
import { useUsersQuery } from '@/api/queries'
import { validateId } from '@/lib/safety/validateId'
import type { NewConversationModalParams } from '@/types'

export const useNewConversationModal = ({
  loggedUserId,
  isOpen,
  onClose,
  onCreated,
}: NewConversationModalParams) => {
  const [query, setQuery] = useState('')
  const [error, setError] = useState<string | null>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)

  const { data: users = [] } = useUsersQuery()
  const { mutateAsync: createConversationMutation, isPending } = useCreateConversationMutation()

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (isOpen && !dialog.open) dialog.showModal()
    if (!isOpen && dialog.open) dialog.close()
  }, [isOpen])

  const filtered = users
    .filter((user) => user.id !== loggedUserId)
    .filter((user) => user.nickname.toLowerCase().includes(query.trim().toLowerCase()))

  const handleSelect = async (recipientId: number) => {
    const validId = validateId(recipientId)
    if (!validId || validId === loggedUserId || isPending) return

    setError(null)

    try {
      const conversationId = await createConversationMutation({
        userId: loggedUserId,
        recipientId: validId,
      })
      onCreated(conversationId)
      onClose()
      setQuery('')
    } catch {
      setError('Unable to create the conversation. Please try again.')
    }
  }

  return {
    dialogRef,
    query,
    setQuery,
    error,
    filtered,
    isPending,
    handleSelect,
  }
}

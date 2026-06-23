import { Avatar } from '../Avatar'
import type { NewConversationModalParams } from '@/types'
import { useNewConversationModal } from './useNewConversationModal'

export const NewConversationModal = ({
  loggedUserId,
  isOpen,
  onClose,
  onCreated,
}: NewConversationModalParams) => {
  const { dialogRef, query, setQuery, error, filtered, isPending, handleSelect } =
    useNewConversationModal({ loggedUserId, isOpen, onClose, onCreated })

  if (!isOpen) return null

  return (
    <dialog
      ref={dialogRef}
      className="modal-dialog w-[calc(100%-2rem)] max-w-[420px] rounded-xl border-none p-0 font-sans shadow-[0_8px_32px_rgba(0,0,0,0.15)]"
      onClose={onClose}
      aria-labelledby="new-conversation-title"
    >
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <h2 id="new-conversation-title" className="m-0 text-[1.1rem]">
          New conversation
        </h2>
        <button
          type="button"
          className="cursor-pointer border-none bg-transparent p-1 text-2xl leading-none text-neutral-400 focus-visible:rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
      </div>

      <input
        type="search"
        className="mx-4 my-2 block w-[calc(100%-2rem)] rounded-full border border-neutral-300 px-3.5 py-2.5 text-[0.9rem] outline-none focus:border-primary"
        placeholder="Search for a user…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        autoFocus
      />

      {error && (
        <p className="mx-4 mb-2 text-[0.85rem] text-danger" role="alert">
          {error}
        </p>
      )}

      <ul
        className="m-0 max-h-80 list-none overflow-y-auto py-2 pb-4"
        role="listbox"
        aria-label="Users"
      >
        {filtered.map((user) => (
          <li key={user.id}>
            <button
              type="button"
              className="flex w-full cursor-pointer items-center gap-3 border-none bg-transparent px-4 py-2.5 text-left text-[0.95rem] hover:bg-neutral-100 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-50"
              disabled={isPending}
              onClick={() => void handleSelect(user.id)}
              role="option"
              aria-selected={false}
            >
              <Avatar nickname={user.nickname} id={user.id} size={40} />
              <span>{user.nickname}</span>
            </button>
          </li>
        ))}
        {!filtered.length && (
          <li className="px-4 py-4 text-center text-[0.9rem] text-neutral-400">No users found.</li>
        )}
      </ul>
    </dialog>
  )
}

import { useEffect, useContext, useState } from 'react'
import { ConversationContext } from '../store/store'
import { User } from '../types/user'
import { apiUrl } from '../pages/_app'

const CreateConversation = () => {
  const { userInfo } = useContext(ConversationContext)
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    const fetchUser = async () => {
      const req = await fetch(`${apiUrl}/users`)
      const res = await req.json()
      console.log(res)
      setUsers(res)
    }
    fetchUser()
  }, [])
  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(
      users.find((obj) => (obj.id = e.target.userSelected.value))?.nickname
    )
    const data = {
      senderId: Number(userInfo.id),
      senderNickname: userInfo.nickname,
      recipientId: Number(e.target.userSelected.value),
      lastMessageTimestamp: Date.now(),
      recipientNickname: users.find(
        (obj) => (obj.id = Number(e.target.userSelected.value))
      )?.nickname,
    }

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
    const req = await fetch(`${apiUrl}/conversations/${userInfo.id}`, options)
    const res = await req.json()
    if (req.ok) console.log(res)
  }
  return (
    <>
      {users ? (
        <form onSubmit={handleSubmit}>
          <select id="userSelected">
            <option value="">Choose an user</option>
            {users
              .filter((u) => u.id !== userInfo.id)
              .map((u) => (
                <option key={u.id} value={u.id}>
                  {u.nickname}
                </option>
              ))}
          </select>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Create conversation</span>
          </button>
        </form>
      ) : null}
    </>
  )
}

export default CreateConversation

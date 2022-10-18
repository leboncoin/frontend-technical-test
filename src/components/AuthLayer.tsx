import Router from 'next/router'
import type { AppProps } from 'next/app'
import { useContext, useEffect, FC, ReactNode } from 'react'
import { ConversationContext } from '../store/store'
import { getLoggedUserId } from '../utils/getLoggedUserId'
import { apiUrl } from '../pages/_app'
import { UserZObject } from '../types/user'

const loggedUserId = getLoggedUserId()

export const AuthLayer: FC = ({ children }) => {
  const ctx = useContext(ConversationContext)
  const fetchUser = async () => {
    const data = await fetch(`${apiUrl}/user/${loggedUserId}`)
    const res = await data.json()
    const parsedData = UserZObject.safeParse(res)
    if (parsedData.success) {
      ctx.handleIsKnown(parsedData.data[0])
    } else {
      ctx.handleIsUnknown()
    }
  }
  useEffect(() => {
    fetchUser()
    fetchUser().catch((err) => ctx.handleIsUnknown())
  }, [loggedUserId])

  return ctx.userInfo.isLogged ? (
    children
  ) : (
    <div className="container mx-auto p-4 flex flex-col items-center justify-center h-full">
      {Object.keys(ctx.userInfo).length === 0 ? (
        <p>loading ...</p>
      ) : (
        <>
          <p>An error occurred, please refresh the page</p>
          <button
            onClick={() => Router.reload()}
            className="border border-1 rounded p-3 mt-3 hover:border-lbc"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
          </button>
        </>
      )}
    </div>
  )
}

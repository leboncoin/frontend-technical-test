import { getLoggedUserId } from '../../utils/getLoggedUserId'

// Default way to get a logged user
export const loggedUserId = getLoggedUserId()

export default function FrLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen p-2 flex flex-col justify-center items-center">
      {children}
    </div>
  )
}
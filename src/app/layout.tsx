import '../styles/globals.css'
import type { Metadata } from 'next'
import { getLoggedUserId } from '../utils/getLoggedUserId'

// Default way to get a logged user
export const loggedUserId = getLoggedUserId()

export const metadata: Metadata = {
  title: 'Frontend Technical test - Leboncoin',
  description: 'Frontend exercise for developpers who want to join us on leboncoin.fr',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className="min-h-screen p-2 flex flex-col justify-center items-center">
        {children}
      </body>
    </html>
  )
}
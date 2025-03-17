import '../styles/globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'Frontend Technical test - Leboncoin',
    template: '%s | Leboncoin',
  },
  description: 'Frontend exercise for developpers who want to join us on leboncoin.fr',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>
        {children}
      </body>
    </html>
  )
}
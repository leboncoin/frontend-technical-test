import { ReactNode } from 'react'
import Head from 'next/head'
import { type ClassValue } from 'clsx'

import Header from '@/components/header'

import { cn } from '@/utils/cn'

interface BaseLayoutProps {
  children?: ReactNode
  className?: ClassValue
}

export default function BaseLayout({ children, className }: BaseLayoutProps) {
  const year = new Date().getFullYear()

  return (
    <div className="flex min-h-screen flex-col">
      <Head>
        <title>Frontend Technical test - Leboncoin</title>
        <meta
          name="description"
          content="Frontend exercise for developpers who want to join us on leboncoin.fr"
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>

      <Header />

      <main
        className={cn('mx-auto w-full max-w-5xl flex-1 px-4 py-8', className)}
      >
        {children}
      </main>

      <footer className="flex h-12 w-full items-center justify-center border border-grey-200">
        &copy; leboncoin - {year}
      </footer>
    </div>
  )
}

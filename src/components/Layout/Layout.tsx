import type { LayoutProps } from '@/types'

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col bg-white text-neutral-900">
      <header className="flex items-baseline gap-3 border-b border-neutral-200 px-5 py-4">
        <span className="text-lg font-bold text-brand">leboncoin</span>
        <span className="text-[0.95rem] text-neutral-500">Messages</span>
      </header>
      <main className="flex min-h-0 flex-1">{children}</main>
    </div>
  )
}

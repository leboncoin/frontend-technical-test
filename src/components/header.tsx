import Image from 'next/image'
import Link from 'next/link'

import logo from '@/assets/lbc-logo.webp'
import accountIcon from '@/assets/account.svg'

export default function Header() {
  return (
    <header>
      <nav className="mx-auto flex w-full max-w-5xl items-center justify-between p-4">
        <Link href="/">
          <Image
            src={logo}
            alt="Leboncoin Frontend Team"
            width={140}
            height={44}
            priority
          />
        </Link>

        <Link
          href="/"
          className="flex flex-col items-center gap-2 border-b-4 border-b-transparent p-2 text-xs transition hover:border-b-orange-600"
        >
          <Image src={accountIcon} alt="" aria-hidden width={24} height={24} />
          <span>Account</span>
        </Link>
      </nav>
    </header>
  )
}

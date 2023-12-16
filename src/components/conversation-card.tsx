import Image from 'next/image'
import Link from 'next/link'

import { AVATAR_URL } from '@/utils/constants'

interface ConversationCardProps {
  id: number
  userId: number
  name: string
  lastMessageTimestamp: number
}

export default function ConversationCard({
  id,
  userId,
  name,
  lastMessageTimestamp,
}: ConversationCardProps) {
  const formattedDate = new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
  }).format(lastMessageTimestamp)

  return (
    <Link
      href={`/conversations/${id}`}
      className="flex gap-8 rounded-lg border border-grey-300 p-6 transition hover:border-orange-600"
    >
      <Image
        src={`${AVATAR_URL}/50?u=${userId}`}
        height={50}
        width={50}
        aria-hidden
        alt=""
        className="rounded-full"
      />

      <div>
        <p className="text-lg font-bold">{name}</p>
        <p className="text-sm">{formattedDate}</p>
      </div>
    </Link>
  )
}

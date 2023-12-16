import Image from 'next/image'

import { AVATAR_URL } from '@/utils/constants'

interface ConversationCardProps {
  id: number
  name: string
  date: string
}

export default function ConversationCard({
  id,
  name,
  date,
}: ConversationCardProps) {
  return (
    <article className="flex gap-8 rounded-lg border border-grey-300 p-6 transition hover:border-orange-600">
      <Image
        src={`${AVATAR_URL}/50?u=${id}`}
        height={50}
        width={50}
        aria-hidden
        alt=""
        className="rounded-full"
      />

      <div>
        <p className="text-lg font-bold">{name}</p>
        <p className="text-sm">{date}</p>
      </div>
    </article>
  )
}

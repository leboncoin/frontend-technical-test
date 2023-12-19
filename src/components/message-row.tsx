import { cn } from '@/utils/cn'

interface MessageRowProps {
  messageBody: string
  isLoggedUser: boolean
  senderName?: string
}

export default function MessageRow({
  messageBody,
  isLoggedUser,
  senderName,
}: MessageRowProps) {
  return (
    <div className="flex">
      <div className={cn('max-w-[60%]', { 'ml-auto': isLoggedUser })}>
        {senderName && (
          <span className="block px-4 py-2 text-sm">{senderName}</span>
        )}
        <p
          className={cn(' rounded-2xl bg-grey-200 p-4', {
            'bg-orange-600 text-white': isLoggedUser,
          })}
        >
          {messageBody}
        </p>
      </div>
    </div>
  )
}

import { cn } from '@/utils/cn'

interface MessageRowProps {
  messageBody: string
  isLoggedUser: boolean
}

export default function MessageRow({
  messageBody,
  isLoggedUser,
}: MessageRowProps) {
  return (
    <div className="flex">
      <p
        className={cn('max-w-[60%] rounded-2xl bg-grey-200 p-4', {
          'bg-orange-600 text-white ml-auto': isLoggedUser,
        })}
      >
        {messageBody}
      </p>
    </div>
  )
}

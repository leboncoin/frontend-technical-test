import { getAvatarColor, getInitial } from '@/lib/display'
import type { AvatarProps } from '@/types'

export const Avatar = ({ nickname, id, size = 48 }: AvatarProps) => {
  const initial = getInitial(nickname)
  const color = getAvatarColor(id ?? nickname)

  return (
    <div
      className="flex shrink-0 items-center justify-center rounded-full font-semibold text-white"
      style={{ backgroundColor: color, width: size, height: size, fontSize: size * 0.4 }}
      aria-hidden="true"
    >
      {initial}
    </div>
  )
}

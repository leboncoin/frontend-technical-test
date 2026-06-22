const MONTHS_EN = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const AVATAR_COLORS = ['#e53935', '#00897b', '#1e88e5', '#8e24aa', '#f4511e', '#3949ab']

const toDate = (timestamp: number): Date => {
  const ms = timestamp < 1_000_000_000_000 ? timestamp * 1000 : timestamp
  return new Date(ms)
}

export const formatConversationDate = (timestamp: number): string => {
  const date = toDate(timestamp)
  const now = new Date()
  const isSameYear = date.getFullYear() === now.getFullYear()

  if (isSameYear) {
    return `${MONTHS_EN[date.getMonth()]} ${date.getDate()}`
  }

  return MONTHS_EN[date.getMonth()]
}

export const formatMessageTime = (timestamp: number): string => {
  const date = toDate(timestamp)
  const now = new Date()
  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear()

  const time = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  })

  if (isToday) {
    return `today at ${time}`
  }

  return `on ${MONTHS_EN[date.getMonth()]} ${date.getDate()} at ${time}`
}

export const formatLastMessageLabel = (timestamp: number): string =>
  `Last message ${formatMessageTime(timestamp)}`

export const getAvatarColor = (seed: string | number): string => {
  const value = String(seed)
  let hash = 0
  for (let i = 0; i < value.length; i += 1) {
    hash = value.charCodeAt(i) + ((hash << 5) - hash)
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length]
}

export const getInitial = (nickname: string): string => {
  const trimmed = nickname.trim()
  if (!trimmed) return '?'
  return trimmed.charAt(0).toUpperCase()
}

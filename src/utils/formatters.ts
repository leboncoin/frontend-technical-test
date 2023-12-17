export function formatLastMessageDateAndTime(timestamp?: number) {
  if (!timestamp) {
    return null
  }

  const lastMessageDate = new Intl.DateTimeFormat('en-GB').format(timestamp)
  const lastMessageTime = new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(timestamp)

  return { date: lastMessageDate, time: lastMessageTime }
}

export function getDateFormattedFromTimestamp(date: Date | number): string {
  return new Intl.DateTimeFormat("en-EN", {
    hour: "numeric",
    minute: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

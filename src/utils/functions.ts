export function getYear(): number {
  return new Date().getFullYear();
}

export function toDayAndMonth(timestamp: number) {
  const date = new Date(timestamp);
  return `${date.getDate()} ${date.toLocaleString('default', {
    month: 'long',
  })}`;
}

export function displayFirstLetter (value: string) : string {
  return value[0].toLocaleUpperCase()
}

export const getYear = (): number => {
  return new Date().getFullYear();
};

export const toDayAndMonth = (timestamp: number) => {
  const date = new Date(timestamp);
  return `${date.getDate()} ${date.toLocaleString('default', {
    month: 'long',
  })}`;
};

export const toDateString = (timestamp: number) => {
  return new Date(timestamp * 1000).toLocaleString();
};

export const displayFirstLetter = (value: string): string => {
  return value[0].toLocaleUpperCase();
};

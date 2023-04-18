export const getLastMessageTimeStandFormated = (timeStamp: number) => {
  const lastMessageDate = new Date(timeStamp);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const formatter = new Intl.DateTimeFormat(
    "fr-FR",
    lastMessageDate >= today
      ? { hour: "numeric", minute: "numeric", hour12: false }
      : { day: "numeric", month: "numeric", year: "numeric" }
  );

  return formatter.format(lastMessageDate);
};

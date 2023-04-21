export const formatTimestamp = (timeStamp: number) => {
  if (!timeStamp) return;
  const lastMessageDate = new Date(timeStamp);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const formatter = new Intl.DateTimeFormat(
    "fr-FR",
    lastMessageDate >= today
      ? { hour: "numeric", minute: "numeric", hour12: false }
      : {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          hour12: false,
        }
  );

  return formatter.format(lastMessageDate).replace(":", "h").replace(",", " à");
};

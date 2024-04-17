export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat("ja", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  }).format(date);
};

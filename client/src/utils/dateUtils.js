export const formatDate = (date) => {
  return Intl.DateTimeFormat("en-us", {
    dateStyle: "full",
    timeZone: "UTC",
  }).format(new Date(date));
};

export const formatDateToYMD = (date) => {
  return Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "UTC"
  }).format(new Date(date));
}

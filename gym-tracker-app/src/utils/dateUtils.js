export const formatDate = (date) => {
  return Intl.DateTimeFormat("en-us", { dateStyle: "full", timeZone: "UTC" }).format(
    new Date(date)
  );
};

export const formatDate = (date) => {
  return Intl.DateTimeFormat("en-us", { dateStyle: "full" }).format(
    new Date(date)
  );
};

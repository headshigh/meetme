export const getDayOfWeek = (day: number) => {
  if (day < 1) return;
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day - 1];
};

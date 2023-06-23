export const AmOrPm = (hour: number, minutes: number) => {
  if (hour < 12) {
    return `${hour.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")} AM`;
  } else if (hour > 12) {
    return `${(hour % 12).toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")} PM`;
  }
  return `${hour}:${minutes.toString().padStart(2, "0")} PM`;
};
export const month = (monthindex?: number) => {
  if (!monthindex) return " ";
  if (monthindex < 1 || monthindex > 12) return " ";
  const englishMonths = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return englishMonths[monthindex - 1];
};
export function convertToISOFormat(dateString: string, timeString: string) {
  // Convert date string to Date object
  const date = new Date(dateString);

  // Extract the time from the time string
  const time: Array<string> = timeString.split(":");
  const hours = parseInt(time[0], 10);
  const minutes = parseInt(time[1], 10);
  const seconds = 0; // Assuming seconds are always 00

  // Set the time on the date object
  date.setHours(hours, minutes, seconds);

  // Convert to UTC
  const combinedDateTimeUTC = new Date(date.getTime());

  // Format as ISO 8601
  const isoFormat = combinedDateTimeUTC
    .toISOString()
    .replace(/[:-]/g, "")
    .replace(/\.\d{3}Z$/, "Z");

  return isoFormat;
}

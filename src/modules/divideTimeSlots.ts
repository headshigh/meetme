function divideTimeSlots(
  startTime: string,
  endTime: string,
  slotDuration: number
) {
  const slots = [];
  let currentTime = startTime;

  while (currentTime <= endTime) {
    slots.push(currentTime);

    const [hours, minutes] = currentTime.split(":");
    const time = new Date();
    if (hours && minutes) {
      time.setHours(Number(hours));
      time.setMinutes(Number(minutes));
    }
    // Increment time based on slot duration
    time.setMinutes(time.getMinutes() + slotDuration);

    currentTime = `${time.getHours()}:${time
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
  }
  return slots;
}
export default divideTimeSlots;

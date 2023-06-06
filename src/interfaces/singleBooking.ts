export default interface booking {
  id: number;
  userId: string;
  eventTypeId?: number;
  link?: string;
  startTime: Date;
  endTime: Date;
}

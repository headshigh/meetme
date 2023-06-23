export default interface booking {
  id: number;
  userId: string;
  date: string;
  eventTypeId?: number;
  link?: string;
  startTime: string;
  hostName: string;
  hostEmail: string;
  endTime: string;
}

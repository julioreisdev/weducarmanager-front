export type TCalendar = ICalendarMonth[];

export type TCalendarTasks = ICalendarTask[];

export interface ICalendarTask {
  id: number;
  month: number;
  day: number;
  description: string;
}

interface ICalendarMonth {
  id: number;
  name: string;
  days: number[];
}

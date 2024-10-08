export type TCalendar = ICalendarMonth[];

export type TCalendarTasks = ICalendarTask[];

export enum TagType {
  formations_and_plans = "formations_and_plans",
  school_day = "school_day",
  school_saturday = "school_saturday",
  assessments = "assessments",
  remedial_classes = "remedial_classes",
  holidays = "holidays",
  collective_vacation = "collective_vacation",
}

export interface ICalendarTask {
  id: number;
  month: number;
  day: number;
  description: string;
}

export interface ICalendarMonth {
  id: number;
  name: string;
  days: ICalendarDay[];
}

export interface ICalendarDay {
  day: number;
  week_day: string;
  is_holiday: boolean;
  is_weekend: boolean;
  tag: TagType | "";
}

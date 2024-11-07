import { IStudentFilters } from "./students.interface";

export interface IPaginatedResult<T> {
  count: number;
  next?: string | null;
  previous?: string | null;
  results: T[];
  applied_filters: IStudentFilters;
}

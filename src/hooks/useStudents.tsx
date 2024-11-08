import useSWR from "swr";
import { fetcherWithParams } from "../utils/api";
import { IStudent, IStudentFilters } from "../interfaces/students.interface";
import { IPaginatedResult } from "../interfaces/generic.interface";

export function UseStudents(params: IStudentFilters) {
  const token = localStorage.getItem("authorization") || "";

  const { data, error, mutate } = useSWR<IPaginatedResult<IStudent>>(
    [`/api/v1/students/students/`, params, token],
    ([url, params]) => fetcherWithParams(url, params as Record<string, unknown>)
  );

  return {
    students: data?.results,
    studentsError: error,
    updateStudents: mutate,
    studentsLoading: !data && !error,
  };
}

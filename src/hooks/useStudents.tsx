import useSWR from "swr";
import { fetcherWithParams } from "../utils/api";
import { IStudentFilterParams } from "../interfaces/students.interface";

export function UseStudents(params: IStudentFilterParams) {
  const token = localStorage.getItem("authorization") || "";

  const { data, error, mutate } = useSWR<unknown>(
    [`/students/`, params, token],
    ([url, params]) => fetcherWithParams(url, params as Record<string, unknown>)
  );

  return {
    students: data,
    studentsError: error,
    updateStudents: mutate,
    studentsLoading: !data && !error,
  };
}

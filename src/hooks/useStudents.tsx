import useSWR from "swr";
import { fetcherWithParams } from "../utils/api";
import {
  IStudent,
  IStudentFilterParams,
} from "../interfaces/students.interface";

type TResponse = {
  data: {
    alunos: IStudent[];
  };
};

export function UseStudents(params: IStudentFilterParams) {
  const token = localStorage.getItem("authorization") || "";

  const { data, error, mutate } = useSWR<TResponse>(
    [`/students/`, params, token],
    ([url, params]) => fetcherWithParams(url, params as Record<string, unknown>)
  );

  return {
    students: data?.data.alunos,
    studentsError: error,
    updateStudents: mutate,
    studentsLoading: !data && !error,
  };
}

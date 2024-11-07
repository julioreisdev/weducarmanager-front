import useSWR from "swr";
import { fetcherWithParams } from "../utils/api";
import { IPaginatedResult } from "../interfaces/generic.interface";

export function UseStudentsStatus() {
  const token = localStorage.getItem("authorization") || "";

  const { data, error, mutate } = useSWR<
    IPaginatedResult<{ id: number; description: string }>
  >([`/api/v1/students/status/`, token], ([url]) => fetcherWithParams(url));

  return {
    studentsStatus: data?.results,
    studentsStatusError: error,
    updateStudentsStatus: mutate,
    studentsStatusLoading: !data && !error,
  };
}

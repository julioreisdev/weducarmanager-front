import useSWR from "swr";
import { fetcherWithParams } from "../utils/api";
import { IPaginatedResult } from "../interfaces/generic.interface";

export function UseEthnicity() {
  const token = localStorage.getItem("authorization") || "";

  const { data, error, mutate } = useSWR<
    IPaginatedResult<{ id: number; description: string }>
  >([`/api/v1/students/color/`, token], ([url]) => fetcherWithParams(url));

  return {
    ethnicity: data?.results,
    ethnicityError: error,
    updateEthnicity: mutate,
    ethnicityLoading: !data && !error,
  };
}

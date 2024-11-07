import useSWR from "swr";
import { fetcherWithParams } from "../utils/api";
import { IPaginatedResult } from "../interfaces/generic.interface";

export function UseLetiveYears() {
  const token = localStorage.getItem("authorization") || "";

  const { data, error, mutate } = useSWR<
    IPaginatedResult<{ academic_year_id: number; description: string }>
  >([`/api/v1/academics/academic-years/`, token], ([url]) =>
    fetcherWithParams(url)
  );

  return {
    letiveYears: data?.results,
    letiveYearsError: error,
    updateLetiveYears: mutate,
    letiveYearsLoading: !data && !error,
  };
}

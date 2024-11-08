import useSWR from "swr";
import { fetcherWithParams } from "../utils/api";
import { IPaginatedResult } from "../interfaces/generic.interface";
import { ISchoolYears } from "../interfaces/school.interface";

export function UseShoolYears() {
  const token = localStorage.getItem("authorization") || "";

  const { data, error, mutate } = useSWR<IPaginatedResult<ISchoolYears>>(
    [`/api/v1/academics/school-years/`, token],
    ([url]) => fetcherWithParams(url)
  );

  return {
    schoolYears: data?.results,
    schoolYearsError: error,
    updateSchoolYears: mutate,
    schoolYearsLoading: !data && !error,
  };
}

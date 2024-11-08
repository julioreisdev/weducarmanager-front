import useSWR from "swr";
import { fetcherWithParams } from "../utils/api";
import { IPaginatedResult } from "../interfaces/generic.interface";
import { ISchool } from "../interfaces/school.interface";

export function UseShools() {
  const token = localStorage.getItem("authorization") || "";

  const { data, error, mutate } = useSWR<IPaginatedResult<ISchool>>(
    [`/api/v1/administration/school/`, token],
    ([url]) => fetcherWithParams(url)
  );

  return {
    schools: data?.results,
    schoolsError: error,
    updateSchools: mutate,
    schoolsLoading: !data && !error,
  };
}

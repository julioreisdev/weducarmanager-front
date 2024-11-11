import useSWR from "swr";
import { fetcherWithParams } from "../utils/api";
import { IPaginatedResult } from "../interfaces/generic.interface";
import { ISchoolClass } from "../interfaces/school.interface";

export function UseSchoolClasses(id: number) {
  const token = localStorage.getItem("authorization") || "";

  const shouldFetch = id !== 0;

  const { data, error, mutate } = useSWR<IPaginatedResult<ISchoolClass>>(
    shouldFetch ? [`/api/v1/management/classes/school/${id}/`, token] : null,
    ([url]) => fetcherWithParams(url)
  );

  return {
    schoolClasses: data?.results,
    schoolClassesError: error,
    updateClassesYears: mutate,
    schoolClassesLoading: !data && !error && shouldFetch,
  };
}

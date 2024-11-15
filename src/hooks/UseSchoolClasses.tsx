import useSWR from "swr";
import { fetcherWithParams } from "../utils/api";
import { ISchoolClass } from "../interfaces/school.interface";

export function UseSchoolClasses(params: {
  id_instancia: string;
  academic_year_id: string;
  school_id: string;
}) {
  const token = localStorage.getItem("authorization") || "";

  const shouldFetch =
    params.id_instancia !== "" &&
    params.academic_year_id !== "" &&
    params.school_id !== "";

  const { data, error, mutate } = useSWR<ISchoolClass[]>(
    shouldFetch ? [`/api/v1/management/classes/`, params, token] : null,
    ([url, params]) => fetcherWithParams(url, params as Record<string, unknown>)
  );

  return {
    schoolClasses: data,
    schoolClassesError: error,
    updateClassesYears: mutate,
    schoolClassesLoading: !data && !error && shouldFetch,
  };
}

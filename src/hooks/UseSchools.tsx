import useSWR from "swr";
import { fetcherWithParams } from "../utils/api";
import { ISchool } from "../interfaces/school.interface";

export function UseSchools(params: { id_instancia: string }) {
  const token = localStorage.getItem("authorization") || "";

  const { data, error, mutate } = useSWR<ISchool[]>(
    [`/api/v1/administration/school/`, params, token],
    ([url, params]) => fetcherWithParams(url, params as Record<string, unknown>)
  );

  return {
    schools: data,
    schoolsError: error,
    updateSchools: mutate,
    schoolsLoading: !data && !error,
  };
}

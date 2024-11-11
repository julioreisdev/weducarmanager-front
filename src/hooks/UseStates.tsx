import useSWR from "swr";
import { fetcherWithParams } from "../utils/api";
import { IPaginatedResult } from "../interfaces/generic.interface";

export function UseStates() {
  const token = localStorage.getItem("authorization") || "";

  const { data, error, mutate } = useSWR<
    IPaginatedResult<{ id: number; name: string; uf: string }>
  >([`/api/v1/locations/states/`, token], ([url]) => fetcherWithParams(url));

  return {
    states: data?.results,
    statesError: error,
    updateStates: mutate,
    statesLoading: !data && !error,
  };
}

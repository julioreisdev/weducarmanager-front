import useSWR from "swr";
import { fetcherWithParams } from "../utils/api";
import { IPaginatedResult } from "../interfaces/generic.interface";

export function UseHousings() {
  const token = localStorage.getItem("authorization") || "";

  const { data, error, mutate } = useSWR<
    IPaginatedResult<{ description: string; housing_id: number }>
  >([`/api/v1/locations/housings/`, token], ([url]) => fetcherWithParams(url));

  return {
    housings: data?.results,
    housingsError: error,
    updateHousings: mutate,
    housingsLoading: !data && !error,
  };
}

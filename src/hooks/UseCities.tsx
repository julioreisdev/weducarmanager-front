import useSWR from "swr";
import { fetcherWithParams } from "../utils/api";
import { IPaginatedResult } from "../interfaces/generic.interface";

export function UseCities() {
  const token = localStorage.getItem("authorization") || "";

  const { data, error, mutate } = useSWR<
    IPaginatedResult<{ id: number; name: string; state: number }>
  >([`/api/v1/locations/cities/`, token], ([url]) => fetcherWithParams(url));

  return {
    cities: data?.results,
    citiesError: error,
    updateCities: mutate,
    citiesLoading: !data && !error,
  };
}

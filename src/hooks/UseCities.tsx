import useSWR from "swr";
import { fetcherWithParams } from "../utils/api";
import { IPaginatedResult } from "../interfaces/generic.interface";

export function UseCities(state: number) {
  const token = localStorage.getItem("authorization") || "";

  const shouldFetch = state !== 0;

  const { data, error, mutate } = useSWR<
    IPaginatedResult<{ id: number; name: string; state: number }>
  >(
    shouldFetch ? [`/api/v1/locations/cities/states/${state}/`, token] : null,
    ([url]) => fetcherWithParams(url)
  );

  return {
    cities: data?.results,
    citiesError: error,
    updateCities: mutate,
    citiesLoading: !data && !error && shouldFetch,
  };
}

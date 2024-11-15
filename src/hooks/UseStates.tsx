import useSWR from "swr";
import { fetcherWithParams } from "../utils/api";

export function UseStates() {
  const token = localStorage.getItem("authorization") || "";

  const { data, error, mutate } = useSWR<
    { id: number; name: string; uf: string }[]
  >([`/api/v1/locations/states/`, token], ([url]) => fetcherWithParams(url));

  return {
    states: data,
    statesError: error,
    updateStates: mutate,
    statesLoading: !data && !error,
  };
}

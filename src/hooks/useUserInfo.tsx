import useSWR from "swr";
import { ILoginResponse } from "../interfaces/user.interface";
import { fetcherWithParams } from "../utils/api";

export function UseUserInfo() {
  const token = localStorage.getItem("authorization") || "";

  const { data, error, mutate } = useSWR<{ data: ILoginResponse }>(
    [`/instances/${localStorage.getItem("id_user")}`, token],
    ([url]) => fetcherWithParams(url)
  );

  return {
    userInfo: data,
    userInfoError: error,
    updateUserInfo: mutate,
    userInfoLoading: !data && !error,
  };
}

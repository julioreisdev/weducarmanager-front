import axios from "axios";
import logout from "./logout";

export function getHeaders() {
  const token = localStorage.getItem("authorization");

  return token
    ? {
        Authorization: `Bearer ${token}`,
      }
    : undefined;
}

export const api = () => {
  return axios.create({
    baseURL: `${import.meta.env.VITE_API}`,
    headers: getHeaders(),
  });
};

export async function fetcherWithParams<T>(
  url: string,
  params?: Record<string, unknown>
): Promise<T> {
  if (!getHeaders()) {
    throw new Error("Invalid credentials");
  }

  return api()
    .get<T>(url, {
      headers: getHeaders(),
      params: {
        ...params,
      },
    })
    .then((res) => res.data)
    .catch((err) => {
      logout(err.response?.status);
      throw err;
    });
}

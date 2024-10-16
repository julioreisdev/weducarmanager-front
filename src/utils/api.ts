import axios from "axios";

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

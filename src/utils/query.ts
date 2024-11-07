import { IStudentFilters } from "../interfaces/students.interface";

export const createQueryString = (filters: IStudentFilters) => {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(filters)) {
    if (value !== undefined && value !== null) {
      params.append(key, String(value));
    }
  }

  return params.toString();
};

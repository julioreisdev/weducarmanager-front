export interface IInstance {
  id: number;
  user_type: string;
  name: string;
}

export interface IEmployee {
  id: number;
  name: string;
  gender: string;
  birth_date: string;
  cpf: string;
  rg?: string | null;
  photo?: string | null;
}

export interface IUserInfo {
  instances: IInstance[];
  employee: IEmployee;
  is_active: boolean;
  is_staff: boolean;
  is_superuser: boolean;
  last_access: boolean;
  username: string;
  id: number;
  access_count: number;
}

export interface ILoginResponse {
  access: string;
  user_info: IUserInfo;
}

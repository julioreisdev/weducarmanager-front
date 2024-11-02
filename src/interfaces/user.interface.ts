export interface IUser {
  id: number;
  super_admin?: number;
  id_funcionario?: number;
  usuario: string;
  status: number;
  acessos: number;
  ultimo_acesso: string | null;
}

export interface IInstance {
  id: number;
  tipo?: string;
  nome: string;
}

export interface IFuncionario {
  id_funcionario: number;
  id_escolaridade: number;
  nome: string;
  sexo: string;
  data_nascimento: string;
  rg: string;
  cpf: string;
  foto: string | null;
}

export interface IUserInfo {
  usuario?: IUser;
  token?: string;
  funcionario?: IFuncionario;
  instancias?: IInstance[];
}

export interface ILoginResponse {
  message: string;
  user_info: IUserInfo;
}

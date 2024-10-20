export interface IUser {
  id: number;
  id_funcionario: number;
  tipo: string;
  usuario: string;
  status: number;
  acessos: number;
  ultimo_acesso: string | null;
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
  usuario: IUser;
  token: string;
  funcionario: IFuncionario;
}

export interface ILoginResponse {
  message: string;
  user_info: IUserInfo;
}

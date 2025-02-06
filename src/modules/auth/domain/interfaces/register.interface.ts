export interface IRegister {
  idUser?: string;
  email: string;
  username: string;
  name: string;
  surname: string;
  birthdate: string;
  password: string;
  role: string;
  phone?: string;
  client?: {
    phone: string;
  };
}
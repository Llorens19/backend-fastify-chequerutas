export interface IJwtToken {
  user: {
    idUser: string;
    role: string;
    username: string;
    email: string;
  }
}
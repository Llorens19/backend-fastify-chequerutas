import { IUserResp } from "./userResp.interface";

export interface ILoginInput {
  email: string;
  password: string;
}

export interface ILoginOutput extends IUserResp{
  token: string;
}

import { IUserResp } from "@/modules/auth/domain/interfaces/userResp.interface";

export interface ILoginInput {
  email: string;
  password: string;
}

export interface ILoginOutput extends IUserResp{
  accessToken: string;
  refreshToken: string;
}

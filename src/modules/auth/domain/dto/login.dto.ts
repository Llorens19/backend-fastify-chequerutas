import { IUserResponse } from "./userResponse.dto";

export interface ILoginResponse extends IUserResponse{
  token: string;
}
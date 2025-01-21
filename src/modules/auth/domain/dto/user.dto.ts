import { IUserGeneric } from "../../../../shared/interfaces/entities/user.interface";
import { IUserResp } from "../interfaces/userResp.interface";

export const userDTO = (user:IUserGeneric):IUserResp => {
  const { password, ...userRest } = user;
  return userRest;
}
import { IUserResp } from "@/modules/auth/domain/interfaces/userResp.interface";
import { IUserGeneric } from "@/shared/interfaces/entities/user.interface";

export const userDTO = (user:IUserGeneric):IUserResp => {
  const { password, ...userRest } = user;
  return userRest;
}
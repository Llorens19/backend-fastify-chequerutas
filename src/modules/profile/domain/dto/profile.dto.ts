import { IUserGeneric } from "../../../../shared/interfaces/entities/user.interface";
import { IProfileResp } from "../interfaces/profile.interface";


export const profileDTO = (user:IUserGeneric):IProfileResp => {
  const { password, ...userRest } = user;
  return userRest;
}
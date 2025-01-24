import { IProfileResp } from "@/modules/profile/domain/interfaces/profile.interface";
import { IUserGeneric } from "@/shared/interfaces/entities/user.interface";


export const profileDTO = (user:IUserGeneric):IProfileResp => {
  const { password, ...userRest } = user;
  return userRest;
}
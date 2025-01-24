import { IEditProfileInput } from "@/modules/profile/domain/interfaces/editProfile.intput";
import { IUserGeneric } from "@/shared/interfaces/entities/user.interface";


export interface IProfileOutputPort {
  getUserByUsername(username: string): Promise<IUserGeneric | null>;
  editUserProfile(idUser: string, user:IEditProfileInput): Promise<IUserGeneric>;
  editAdminProfile(idUser: string, user:IEditProfileInput): Promise<void>;
  editClientProfile(idUser: string, user:IEditProfileInput): Promise<void>;
}

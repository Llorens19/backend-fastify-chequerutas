import { IAdminFields } from "../../../../shared/interfaces/entities/admin.interface";
import { IUserGeneric } from "../../../../shared/interfaces/entities/user.interface";
import { IEditProfileInput } from "../../domain/interfaces/editProfile.intput";

export interface IProfileOutputPort {
  getUserByUsername(username: string): Promise<IUserGeneric | null>;
  editUserProfile(idUser: string, user:IEditProfileInput): Promise<IUserGeneric>;
  editAdminProfile(idUser: string, user:IEditProfileInput): Promise<void>;
  editClientProfile(idUser: string, user:IEditProfileInput): Promise<void>;
}

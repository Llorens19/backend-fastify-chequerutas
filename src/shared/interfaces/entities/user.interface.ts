import { Users } from "@/shared/entities/Users";
import { IAdminFields } from "@/shared/interfaces/entities/admin.interface";
import { IClientFields } from "@/shared/interfaces/entities/client.interface";


export interface IUser extends Users{}

export interface IUserGeneric extends IUser {
  admin?: IAdminFields;
  client?: IClientFields;
}

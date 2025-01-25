import { Admins } from "@/shared/entities/Admins";
import { IUser } from "@/shared/interfaces/entities/user.interface";


export interface IAdminFields extends Admins{}

export interface IAdmin extends IUser{
  admin: IAdminFields;
}
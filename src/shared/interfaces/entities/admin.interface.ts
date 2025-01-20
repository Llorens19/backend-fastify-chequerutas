import { Admins } from "../../entities/Admins";
import { IUser } from "./user.interface";

export interface IAdminFields extends Admins{}

export interface IAdmin extends IUser{
  admin: IAdminFields;
}
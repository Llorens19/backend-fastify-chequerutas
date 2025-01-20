import { Users } from "../../entities/Users";
import { IAdminFields } from "./admin.interface";
import { IClientFields } from "./client.interface";

export interface IUser extends Users{}

export interface IUserGeneric extends IUser {
  admin?: IAdminFields;
  client?: IClientFields;
}

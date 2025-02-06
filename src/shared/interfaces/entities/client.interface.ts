import { Clients } from "@/shared/entities/Clients";
import { IUser } from "@/shared/interfaces/entities/user.interface";

export interface IClientFields extends Clients{}

export interface IClient extends IUser{
  client: IClientFields;
}

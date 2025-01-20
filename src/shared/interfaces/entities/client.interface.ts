import { Clients } from "../../entities/Clients";
import { IUser } from "./user.interface";

export interface IClientFields extends Clients{}

export interface IClient extends IUser{
  client: IClientFields;
}
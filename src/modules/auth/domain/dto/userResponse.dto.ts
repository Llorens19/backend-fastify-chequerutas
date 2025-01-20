import { IUserGeneric } from "../../../../shared/interfaces/entities/user.interface";

export interface IUserResponse extends Omit<IUserGeneric, 'password'> {}
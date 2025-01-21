import { IUserGeneric } from "../../../../shared/interfaces/entities/user.interface";

export interface IUserResp extends Omit<IUserGeneric, 'password'> {}
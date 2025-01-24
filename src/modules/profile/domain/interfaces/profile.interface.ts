import { IUserGeneric } from "@/shared/interfaces/entities/user.interface";


export interface IProfileResp extends Omit<IUserGeneric, 'password'> {}
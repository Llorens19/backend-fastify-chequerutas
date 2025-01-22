import { IUserGeneric } from "../../../../shared/interfaces/entities/user.interface";

export interface IProfileOutputPort {
  getUserByUsername(username: string): Promise<IUserGeneric | null>;
}

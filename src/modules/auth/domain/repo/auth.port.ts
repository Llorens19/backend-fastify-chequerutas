import { IRegister } from "@/modules/auth/domain/interfaces/register.interface";
import { IAdminFields } from "@/shared/interfaces/entities/admin.interface";
import { IBlackList } from "@/shared/interfaces/entities/blackList.interface";
import { IClientFields } from "@/shared/interfaces/entities/client.interface";
import { IRefreshToken } from "@/shared/interfaces/entities/refresToken.interface";
import { IUserGeneric } from "@/shared/interfaces/entities/user.interface";


export interface IAuthOutputPort {
  getUserByEmailRepo(email: string): Promise<IUserGeneric | null>;
  getUserByUsernameRepo(username: string): Promise<IUserGeneric | null>;
  registerRepo(user: IRegister): Promise<IUserGeneric>;
  registerAdminRepo(user: IRegister): Promise<IAdminFields>;
  registerClientRepo(user: Omit<IClientFields, 'idClient'>): Promise<IClientFields>;
  addTokenToBlacklistRepo(token: string): Promise<void>;
  addRefreshTokenRepo(token: string, idUser: string, expiresAt: number): Promise<IRefreshToken>;
  searchRefreshToken(token: string): Promise<IRefreshToken | null>;
  searchBlackListToken(token: string): Promise<IBlackList | null>;
  deleteRefreshToken(token: string): Promise<void>;
}

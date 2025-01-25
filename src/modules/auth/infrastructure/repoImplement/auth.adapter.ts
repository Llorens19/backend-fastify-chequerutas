//typeORM
import { AppDataSource } from "@/config/typeorm.config";
import { MoreThan } from "typeorm";

//Repositories
import { Admins } from "@/shared/entities/Admins";
import { BlacklistTokens } from "@/shared/entities/BlacklistTokens";
import { Clients } from "@/shared/entities/Clients";
import { RefreshTokens } from "@/shared/entities/RefreshTokens";
import { Users } from "@/shared/entities/Users";


//Interfaces
import { IRegister } from "@/modules/auth/domain/interfaces/register.interface";
import { IAuthOutputPort } from "@/modules/auth/domain/repo/auth.port";
import { IAdminFields } from "@/shared/interfaces/entities/admin.interface";
import { IBlackList } from "@/shared/interfaces/entities/blackList.interface";
import { IClientFields } from "@/shared/interfaces/entities/client.interface";
import { IRefreshToken } from "@/shared/interfaces/entities/refresToken.interface";
import { IUser, IUserGeneric } from "@/shared/interfaces/entities/user.interface";





const connection = AppDataSource.getRepository<IUser>(Users);
const connectionAdmin = AppDataSource.getRepository<IAdminFields>(Admins);
const connectionClient = AppDataSource.getRepository<IClientFields>(Clients);
const connectionTokenBlackList = AppDataSource.getRepository<IBlackList>(BlacklistTokens);
const connectionRefreshToken = AppDataSource.getRepository<IRefreshToken>(RefreshTokens);

export class AuthRepoAdapter implements IAuthOutputPort {

  getUserByEmailRepo = async (email: string): Promise<IUserGeneric | null> => {
    const user = await connection.findOne({ where: { email } });

    if (!user) return null;

    const { role, idUser } = user;

    if (role === 'admin') {
      const admin = await connectionAdmin.findOne({ where: { idUser: idUser } });
      if (!admin) return null;
      return { ...user, admin };
    }

    if (role === 'client') {
      const client = await connectionClient.findOne({ where: { idUser: idUser } });
      if (!client) return null;
      return { ...user, client };
    }

    return user;
  };

  registerRepo = async (user: IRegister): Promise<IUserGeneric> => {
    return await connection.save(user);
  };

  registerAdminRepo = async (user: IRegister): Promise<IAdminFields> => {
    return await connectionAdmin.save(user);
  };

  registerClientRepo = async (user: IRegister): Promise<IClientFields> => {
    return await connectionClient.save(user);
  };

  addTokenToBlacklistRepo = async (token: string): Promise<void> => {
    await connectionTokenBlackList.save({ token, expiresAt: new Date(Date.now()) });
  }

  addRefreshTokenRepo = async (token: string, idUser: string, expiresTime: number): Promise<IRefreshToken> => {
    return await connectionRefreshToken.save({ token, idUser, expiresAt: new Date(Date.now() + (expiresTime*1000)) });
  }

  searchRefreshToken = async (token: string): Promise<IRefreshToken | null> => {
    return await connectionRefreshToken.findOne({ where: { token, expiresAt: MoreThan(new Date()) } });
  }

  searchBlackListToken = async (token: string): Promise<IBlackList | null> => {
    return await connectionTokenBlackList.findOne({ where: { token } });
  }

}
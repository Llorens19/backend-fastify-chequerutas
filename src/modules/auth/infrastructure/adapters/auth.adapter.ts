//Conexion
import { AppDataSource } from '../../../../config/typeorm.config';

//Interfaces
import { IUser, IUserGeneric } from '../../../../shared/interfaces/entities/user.interface';
import { IAdminFields } from '../../../../shared/interfaces/entities/admin.interface';
import { IClientFields } from '../../../../shared/interfaces/entities/client.interface';
import { IRegister } from '../../domain/interfaces/register.interface';

//Entities
import { Users } from '../../../../shared/entities/Users';
import { Admins } from '../../../../shared/entities/Admins';
import { Clients } from '../../../../shared/entities/Clients';


const connection = AppDataSource.getRepository<IUser>(Users);
const connectionAdmin = AppDataSource.getRepository<IAdminFields>(Admins);
const connectionClient = AppDataSource.getRepository<IClientFields>(Clients);


export const getUserByEmailRepo = async (email: string): Promise<IUserGeneric | null> => {
  const user = await connection.findOne({ where: { email } });

  if (!user) return null;

  const {role, idUser} = user;

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
}

export const registerRepo = async (user: IRegister): Promise<IUserGeneric> => {
  return await connection.save(user);
};

export const registerAdminRepo = async (user: IRegister): Promise<IAdminFields> => {
  return await connectionAdmin.save(user);
};

export const registerClientRepo = async (user: IRegister): Promise<IClientFields> => {
  return await connectionClient.save(user);
};

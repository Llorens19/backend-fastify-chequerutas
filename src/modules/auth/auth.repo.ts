//Conexion
import { AppDataSource } from '../../config/typeorm.config';


//Entities
import { Users } from '../../shared/entities/Users';
import { IRegister } from './interfaces/register.interface';
import { Admins } from '../../shared/entities/Admins';
import { Clients } from '../../shared/entities/Clients';
import { IUser, IUserGeneric } from '../../shared/interfaces/entities/user.interface';
import { IAdminFields } from '../../shared/interfaces/entities/admin.interface';
import { IClientFields } from '../../shared/interfaces/entities/client.interface';

const connection = AppDataSource.getRepository<IUser>(Users);
const connectionAdmin = AppDataSource.getRepository<IAdminFields>(Admins);
const connectionClient = AppDataSource.getRepository<IClientFields>(Clients);


export const getUserByEmailRepo = async (email: string): Promise<IUserGeneric | null> => {
  const user = await connection.findOne({ where: { email } });

  console.log(user);


  if (!user) return null;

  if (user.role === 'admin') {
    console.log(user.idUser);
    const admin = await connectionAdmin.findOne({ where: { idUser: user.idUser } });
    if (!admin) return null;
    return { ...user, admin };
  }

  if (user.role === 'client') {
    const client = await connectionClient.findOne({ where: { idUser: user.idUser } });
    if (!client) return null;
    return { ...user, client };
  }

  return user;
}


export const registerRepo = async (user: IRegister): Promise<IUserGeneric> => {
  return await connection.save(user);
};

export const registerAdminRepo = async (user: IRegister): Promise<IAdminFields> => {
  const response = await connectionAdmin.save(user);
  console.log(response);
  return response;
};

export const registerClientRepo = async (user: IRegister): Promise<IClientFields> => {
  return await connectionClient.save(user);
};
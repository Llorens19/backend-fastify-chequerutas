//Conexion
import { AppDataSource } from '../../../../config/typeorm.config';
import { Users } from '../../../../shared/entities/Users';
import { IAdminFields } from '../../../../shared/interfaces/entities/admin.interface';
import { IUserGeneric } from '../../../../shared/interfaces/entities/user.interface';

//Interfaces
import { IProfileOutputPort } from '../ports/profile.port';
import { Admins } from '../../../../shared/entities/Admins';
import { IClientFields } from '../../../../shared/interfaces/entities/client.interface';
import { Clients } from '../../../../shared/entities/Clients';
import { IEditProfileInput } from '../../domain/interfaces/editProfile.intput';


const connection = AppDataSource.getRepository<IUserGeneric>(Users);
const connectionAdmin = AppDataSource.getRepository<IAdminFields>(Admins);
const connectionClient = AppDataSource.getRepository<IClientFields>(Clients);



export class ProfileRepoAdapter implements IProfileOutputPort {

  getUserByUsername = async (username: string): Promise<IUserGeneric | null> => {
    const user = await connection.findOne({ where: { username } });

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

  editUserProfile = async (idUser: string, user: IEditProfileInput): Promise<IUserGeneric> => {
    console.log('User', user);
    const userUpdated = await connection.save({ ...user, idUser });
    return userUpdated;
  };

  editAdminProfile = async (idUser: string, user: IEditProfileInput): Promise<void> => {
    await connectionAdmin.update({ idUser }, { ...user.admin });
  }

  editClientProfile= async(idUser: string, user: IEditProfileInput): Promise<void> =>{
    await connectionClient.update({ idUser }, { ...user.client });
  }


}

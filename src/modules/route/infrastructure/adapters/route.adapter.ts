//Conexion
import { IRoute } from '@/shared/interfaces/entities/route.interface';
import { AppDataSource } from '../../../../config/typeorm.config';

//Interfaces
import { ICreateRouteFieldsRepo } from '../../domain/interfaces/createRoute.interface';
import { IRouteOutputPort } from '../ports/route.port';
import { Routes } from '@/shared/entities/Routes';
import { IUserGeneric } from '@/shared/interfaces/entities/user.interface';
import { Users } from '@/shared/entities/Users';
import { Admins } from '@/shared/entities/Admins';
import { Clients } from '@/shared/entities/Clients';
import { IClientFields } from '@/shared/interfaces/entities/client.interface';
import { IAdminFields } from '@/shared/interfaces/entities/admin.interface';
import { ICategory } from '@/shared/interfaces/entities/category.interface';
import { Categories } from '@/shared/entities/Categories';


const connectionRoute = AppDataSource.getRepository<IRoute>(Routes);
const connectionUser = AppDataSource.getRepository<IUserGeneric>(Users);
const connectionAdmin = AppDataSource.getRepository<IAdminFields>(Admins);
const connectionClient = AppDataSource.getRepository<IClientFields>(Clients);
const connectionCategory = AppDataSource.getRepository<ICategory>(Categories);

export class RouteRepoAdapter implements IRouteOutputPort {
  createRoute = async (route: ICreateRouteFieldsRepo): Promise<IRoute> => {
    return await connectionRoute.save(route);
  }

  getUserById = async (idUser: string): Promise<IUserGeneric | null> => {
    const user = await connectionUser.findOne({ where: { idUser } });

    if (!user) return null;

    const { role } = user;

    if (role === 'admin') {
      const admin = await connectionAdmin.findOne({ where: { idUser } });
      if (!admin) return null;
      return { ...user, admin };
    }

    if (role === 'client') {
      const client = await connectionClient.findOne({ where: { idUser } });
      if (!client) return null;
      return { ...user, client };
    }

    return user;
  };

  getCategoryById(idCategory: string): Promise<ICategory | null> {
    return connectionCategory.findOne({ where: { idCategory } });
  }

}

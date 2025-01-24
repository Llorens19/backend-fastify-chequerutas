//Conexion
import { IRoute } from '@/shared/interfaces/entities/route.interface';
import { AppDataSource } from '../../../../config/typeorm.config';

//Interfaces
import { ICreateRouteFieldsRepo } from '../../domain/interfaces/createRoute.interface';
import { IRouteOutputPort } from '../ports/route.port';
import { Routes } from '@/shared/entities/Routes';


const connectionRoute = AppDataSource.getRepository<IRoute>(Routes);

export class RouteRepoAdapter implements IRouteOutputPort {
  createRoute = async (route: ICreateRouteFieldsRepo): Promise<IRoute> => {
    return await connectionRoute.save(route);
  }
}

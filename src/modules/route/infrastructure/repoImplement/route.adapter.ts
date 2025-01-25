//Conexion
import { IRoute } from '@/shared/interfaces/entities/route.interface';
import { AppDataSource } from '../../../../config/typeorm.config';

//Interfaces
import { ICreateRouteFieldsRepo } from '../../domain/interfaces/createRoute.interface';
import { IRouteOutputPort } from '../../domain/repo/route.port';
import { Routes } from '@/shared/entities/Routes';
import { IGetAllRoutesOutput } from '@/modules/route/domain/interfaces/getAllRoutes.interface';
import { IEditRouteInput } from '@/modules/route/domain/interfaces/editRoute.interface';


const connectionRoute = AppDataSource.getRepository<IRoute>(Routes);


export class RouteRepoAdapter implements IRouteOutputPort {
  createRoute = async (route: ICreateRouteFieldsRepo): Promise<IRoute> => {
    return await connectionRoute.save(route);
  }

  getRouteById = async (idRoute: string): Promise<IRoute | null> => {
    const resp = await connectionRoute.findOne({
      relations: [
        "comments",
        "favorites",
        "imagesRoutes",
        "category",
        "user",
        "usersRatings"
      ],
      where: {
        idRoute,
      }
    });
    return resp;
  }


  getAllRoutes = async (query: any): Promise<IGetAllRoutesOutput> => {
    const { limit, offset } = query;
    const resp = await connectionRoute.findAndCount({
      relations: [
        "comments",
        "favorites",
        "imagesRoutes",
        "category",
        "user",
        "usersRatings"
      ],
      where: {
        isPublic: true,
      },
      take: limit,
      skip: offset,
    });

    const [routes, total] = resp;

    return { routes, count: total };
  }

  editRoute = async (route: IEditRouteInput): Promise<IRoute> => {
    console.log(route);
    return await connectionRoute.save(route);
  }

  deleteRoute = async (idRoute: string): Promise<IRoute | null> => {
    const route = await connectionRoute.findOne({
      relations: [
        "comments",
        "favorites",
        "imagesRoutes",
        "category",
        "user",
        "usersRatings"
      ],
      where: {
        idRoute,
      }
    });
    if (!route) {
      return null;
    }
    await connectionRoute.delete(idRoute);
    return route;
  }




}

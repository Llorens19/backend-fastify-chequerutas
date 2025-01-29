//Conexion
import { IRoute } from '@/shared/interfaces/entities/route.interface';
import { AppDataSource } from '../../../../config/typeorm.config';

//Interfaces
import { ICreateRouteFieldsRepo } from '../../domain/interfaces/createRoute.interface';
import { IRouteOutputPort } from '../../domain/repo/route.port';
import { Routes } from '@/shared/entities/Routes';
import { IGetAllRoutesOutput, IQueryParams } from '@/modules/route/domain/interfaces/getAllRoutes.interface';
import { IEditRouteInput } from '@/modules/route/domain/interfaces/editRoute.interface';
import {  ILike, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';


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

  getAllRoutes = async (query: IQueryParams): Promise<IGetAllRoutesOutput> => {

    console.log(query);


    const { limit = 10, offset = 0, title, level, distanceMax, distanceMin, category, location } = query;

    console.log({ limit, offset, title, level, distanceMax, distanceMin, category, location });

    const limitValue = Math.max(1, Number(limit));
    const offsetValue = Math.max(0, Number(offset));

    const [routes, total] = await connectionRoute.findAndCount({
      relations: ["comments", "favorites", "imagesRoutes", "category", "user", "usersRatings", "location"],
      where: {
        isPublic: true,
        ...(title ? { title: ILike(`%${title}%`) } : {}),
        ...(level && level !== 0 ? { level } : {}),
        ...(category ? { category: { idCategory: category } } : {}),
        ...(location ? { location: ILike(`%${location}%`) } : {}),
        ...(distanceMax ? { distance: LessThanOrEqual(distanceMax) } : {}),
        ...(distanceMin ? { distance: MoreThanOrEqual(distanceMin) } : {}),

      },
      take: limitValue,
      skip: offsetValue,
    });

    return { routes, count: total };
  };


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
        "usersRatings",
        "location"
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

  getRouteLocations = async (): Promise<any> => {
    const locations = await connectionRoute.find({
      select: ["location"],
      where: {
        isPublic: true,
      }
    });
    return locations.map(location => location.location);
  }


}

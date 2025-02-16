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
import { ILocation } from '@/shared/interfaces/entities/location.interface';
import { IRotePointsResp } from '@/modules/route/domain/interfaces/getRoutePoints.use-case';
import { ICoordenate } from '@/shared/interfaces/utils/coordinat.interface';
import { IFavorite } from '@/shared/interfaces/entities/favorite.interface';
import { Favorites } from '@/shared/entities/Favorites';
import { IImageRoute } from '@/shared/interfaces/entities/imageRoute.interface';
import { ImagesRoutes } from '@/shared/entities/ImagesRoutes';


const connectionRoute = AppDataSource.getRepository<IRoute>(Routes);
const connectionFavorite = AppDataSource.getRepository<IFavorite>(Favorites);
const connectionImagesRoute = AppDataSource.getRepository<IImageRoute>(ImagesRoutes);


export class RouteRepoAdapter implements IRouteOutputPort {

  createRoute = async (route: ICreateRouteFieldsRepo): Promise<IRoute> => {

    const {imagesRoutes, ...routeData} = route;
    const resp = await connectionRoute.save(routeData);

    if (resp) {
      const images = imagesRoutes.map(image => connectionImagesRoute.create({idRoute: resp.idRoute, imageUrl: image}));
      await connectionImagesRoute.save(images);
    }

    return resp;
  }

  getRouteById = async (idRoute: string): Promise<IRoute | null> => {
    const resp = await connectionRoute.findOne({
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
    return resp;
  }

  getAllRoutes = async (query: IQueryParams): Promise<IGetAllRoutesOutput> => {

    console.log(query);


    const { limit = 10, offset = 0, title, level, distanceMax, distanceMin, category, location } = query;

    console.log({ limit, offset, title, level, distanceMax, distanceMin, category, location });

    const [routes, total] = await connectionRoute.findAndCount({
      relations: ["comments", "favorites", "imagesRoutes", "category", "user", "usersRatings", "location"],
      where: {
        isPublic: true,
        ...(title ? { title: ILike(`%${title}%`) } : {}),
        ...(level && level != 0 ? { level } : {}),
        ...(category ? { category: { idCategory: category } } : {}),
        ...(location ? { idLocation: location } : {}),
        ...(distanceMax ? { distance: LessThanOrEqual(distanceMax) } : {}),
        ...(distanceMin ? { distance: MoreThanOrEqual(distanceMin) } : {}),

      },
      take: limit,
      skip: offset,
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

  getRouteLocations = async (): Promise<ILocation[]> => {
    const locations = await connectionRoute.find({
      select: ["location"],
      relations: ["location"],
      where: {
        isPublic: true,
      }
    });

    const locationsDistinct = Array.from(
      new Map(locations.map(location => [location.location.idLocation, location.location])).values()
    );

    return locationsDistinct;
  }

  getRouteTitles = async (): Promise<string[]> => {
    const titles = await connectionRoute.find({
      select: ["title"],
      where: {
        isPublic: true,
      }
    });

    const titlesDistinct = Array.from(
      new Map(titles.map(title => [title.title, title])).values()
    );

    return titlesDistinct.map(route => route.title);
  }

  getRoutePoints = async (query: IQueryParams): Promise<IRotePointsResp> => {
    const { title, level, distanceMax, distanceMin, category, location } = query;

    console.log({ title, level, distanceMax, distanceMin, category, location });

    const [routes, total] = await connectionRoute.findAndCount({
      select: ["startCoordinates", "idRoute"],
      where: {
        isPublic: true,
        ...(title ? { title: ILike(`%${title}%`) } : {}),
        ...(level && level != 0 ? { level } : {}),
        ...(category ? { category: { idCategory: category } } : {}),
        ...(location ? { idLocation: location } : {}),
        ...(distanceMax ? { distance: LessThanOrEqual(distanceMax) } : {}),
        ...(distanceMin ? { distance: MoreThanOrEqual(distanceMin) } : {}),
      },
    });

    const points = routes as { idRoute: string; startCoordinates: ICoordenate }[];

    console.log(points);

    return { points, count: total };
  };

  getRoutesUserPublic = async (username: string): Promise<IRoute[]> => {
    const routes = await connectionRoute.find({
      relations: ["comments", "favorites", "imagesRoutes", "category", "user", "usersRatings", "location"],
      where: {
        isPublic: true,
        user: {
          username
        }
      }
    });

    return routes;
  }

  getRoutesUserPrivate = async (username: string): Promise<IRoute[]> => {
    const routes = await connectionRoute.find({
      relations: ["comments", "favorites", "imagesRoutes", "category", "user", "usersRatings", "location"],
      where: {
        isPublic: false,
        user: {
          username
        }
      }
    });

    return routes;
  };

  isFavorite = async (idRoute: string, idUser: string): Promise<boolean> => {
    const isFavorite = await connectionFavorite.findOne({
      where: {
        idRoute,
        idUser
      }
    });

    return !!isFavorite;
  };

  favoriteRoute = async (idRoute: string, idUser: string): Promise<IFavorite> => {
    const favorite = connectionFavorite.create({
      idRoute,
      idUser,
    });

    return await connectionFavorite.save(favorite);

  };

  unFavoriteRoute = async (idRoute: string, idUser: string): Promise<IFavorite | null> => {
    const favorite = await connectionFavorite.findOne({
      where: {
        idRoute,
        idUser
      }
    });

    if (!favorite) {
      return null;
    }

    await connectionFavorite.delete(favorite.idFavorite);

    return favorite;
  };


}

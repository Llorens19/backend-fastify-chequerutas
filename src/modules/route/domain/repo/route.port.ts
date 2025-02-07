import { ICreateRouteFieldsRepo } from "@/modules/route/domain/interfaces/createRoute.interface";
import { IEditRouteInput } from "@/modules/route/domain/interfaces/editRoute.interface";
import { IGetAllRoutesOutput, IQueryParams } from "@/modules/route/domain/interfaces/getAllRoutes.interface";
import { IRotePointsResp } from "@/modules/route/domain/interfaces/getRoutePoints.use-case";
import { ILocation } from "@/shared/interfaces/entities/location.interface";
import { IRoute } from "@/shared/interfaces/entities/route.interface"


export interface IRouteOutputPort {
  createRoute(route: ICreateRouteFieldsRepo): Promise<IRoute>;
  getRouteById(idRoute: string): Promise<IRoute | null>;
  getAllRoutes(query: IQueryParams): Promise<IGetAllRoutesOutput>;
  editRoute(route: IEditRouteInput): Promise<IRoute>;
  deleteRoute(idRoute: string): Promise<IRoute | null>;
  getRouteLocations(): Promise<ILocation[]>;
  getRouteTitles(): Promise<string[]>;
  getRoutePoints(query: IQueryParams): Promise<IRotePointsResp>;
  getRoutesUserPublic(username: string): Promise<IRoute[] | null>;
}

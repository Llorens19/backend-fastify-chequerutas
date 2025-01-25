import { ICreateRouteFieldsRepo } from "@/modules/route/domain/interfaces/createRoute.interface";
import { IEditRouteInput } from "@/modules/route/domain/interfaces/editRoute.interface";
import { IGetAllRoutesOutput } from "@/modules/route/domain/interfaces/getAllRoutes.interface";
import { IRoute } from "@/shared/interfaces/entities/route.interface"


export interface IRouteOutputPort {
  createRoute(route: ICreateRouteFieldsRepo): Promise<IRoute>;
  getRouteById(idRoute: string): Promise<IRoute | null>;
  getAllRoutes(query:any): Promise<IGetAllRoutesOutput>;
  editRoute(route: IEditRouteInput): Promise<IRoute>;
  deleteRoute(idRoute: string): Promise<IRoute | null>;
}

import { IRouteResp } from "@/modules/route/domain/interfaces/route.interface";

export interface IGetAllRoutesInput{}

export interface IGetAllRoutesOutput{
  routes: IRouteResp[];
  count: number;
}

export interface IQueryParams {
  title?: string;
  level?: number;
  distanceMax?: number;
  distanceMin?: number;
  category?: string;
  location?: string;
  limit?: number;
  offset?: number;
}

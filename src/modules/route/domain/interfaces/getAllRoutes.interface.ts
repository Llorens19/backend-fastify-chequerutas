import { IRouteResp } from "@/modules/route/domain/interfaces/route.interface";

export interface IGetAllRoutesInput{}

export interface IGetAllRoutesOutput{
  routes: IRouteResp[];
  count: number;
}
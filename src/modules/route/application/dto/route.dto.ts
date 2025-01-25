import { IRouteResp } from "@/modules/route/domain/interfaces/route.interface";
import { IRoute } from "@/shared/interfaces/entities/route.interface";


export const routeDTO = (route: IRoute): IRouteResp => {
  const { password, ...userRest } = route.user;

  return {
    ...route,
    user: userRest
  };
}
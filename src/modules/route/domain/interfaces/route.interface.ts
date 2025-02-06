import { IRoute } from "@/shared/interfaces/entities/route.interface";

export interface IRouteResp extends Omit<IRoute, "user"> {
  user: Omit<IRoute["user"], "password">;
}
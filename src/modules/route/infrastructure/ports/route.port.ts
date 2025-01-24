import { ICreateRouteFieldsRepo } from "@/modules/route/domain/interfaces/createRoute.interface";
import { ICategory } from "@/shared/interfaces/entities/category.interface";
import { IRoute } from "@/shared/interfaces/entities/route.interface"
import { IUserGeneric } from "@/shared/interfaces/entities/user.interface";


export interface IRouteOutputPort {
  createRoute(route: ICreateRouteFieldsRepo): Promise<IRoute>;
  getUserById(idUser: string): Promise<IUserGeneric | null>;
  getCategoryById(idCategory: string): Promise<ICategory | null>;
}

import { IRoute } from "@/shared/interfaces/entities/route.interface";
import { IUserGeneric } from "@/shared/interfaces/entities/user.interface";

export interface IFavorite{
  idFavorite: string;
  idUser: string;
  idRoute: string;
  createdAt: Date;
  user?: IUserGeneric;
  route?: IRoute;
}

export interface IFavorites{
  favorites: IFavorite[];
}
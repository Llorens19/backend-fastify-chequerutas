import { ICoordenate } from "../../../../shared/interfaces/utils/coordinat.interface";

export interface ICreateRouteInput {
  title: string;
  description: string;
  coordinates: ICoordenate[];
  level: string;
  duration: number;
  idCategory: string;
  isPublic: boolean;
  location: string;
}

export interface ICreateRouteFieldsRepo {
  idUser: string;
  title: string;
  description: string;
  coordinates: ICoordenate[];
  level: string;
  distance: number;
  duration: number;
  avergeRating: number;
  startCoordinates: ICoordenate;
  idCategory: string;
  slugRoute: string;
  isPublic: boolean;
  positiveGradient: number | null;
  negativeGradient: number | null;
  cumulativeGradient: number | null;
  location: string;
}
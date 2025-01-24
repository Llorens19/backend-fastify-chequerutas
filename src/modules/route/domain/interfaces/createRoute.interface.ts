import { ICoordenate } from "../../../../shared/interfaces/utils/coordinat.interface";

export interface ICreateRouteInput {
  title: string;
  description: string;
  coordinates: ICoordenate[];
  level: string;
  duration: number;
  idCategory: string;
  isPublic: boolean;
}
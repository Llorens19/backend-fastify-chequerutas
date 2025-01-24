import { ICategory } from "../../domain/interfaces/createRoute.interface";

export interface ICategoryOutputPort {
  getCategories(): Promise<ICategory[]>;
}

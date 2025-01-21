import { ICategory } from "../../domain/interfaces/category.interface";

export interface ICategoryOutputPort {
  getCategories(): Promise<ICategory[]>;
}

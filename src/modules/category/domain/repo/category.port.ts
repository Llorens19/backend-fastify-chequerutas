import { ICategory } from "@/shared/interfaces/entities/category.interface";


export interface ICategoryOutputPort {
  getCategories(): Promise<ICategory[]>;
}

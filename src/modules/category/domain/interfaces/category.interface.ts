import { Categories } from "../../../../shared/entities/Categories";

export interface ICategory extends Categories {}

export interface ICategories {
  categories: ICategory[];
}
//Conexion
import { AppDataSource } from '../../config/typeorm.config';
import { Categories } from '../../shared/entities/Categories';

//Entities
import { ICategory } from './interfaces/category.interface';

export const getCategoriesRepo = async ():Promise<ICategory[]> => {
  return await AppDataSource.getRepository<ICategory>(Categories).find();
};
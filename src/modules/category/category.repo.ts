//Conexion
import { AppDataSource } from '../../config/typeorm.config';
import { Categories } from '../../shared/entities/Categories';

//Entities
import { ICategory } from './interfaces/category.interface';

const connection = AppDataSource.getRepository<ICategory>(Categories);

export const getCategoriesRepo = async ():Promise<ICategory[]> => {
  return await connection.find();
};
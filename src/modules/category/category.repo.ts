//Conexion
import { AppDataSource } from '../../config/typeorm.config';
import { Categories } from '../../shared/entities/Categories';

//Entities
import { ICategory } from './interfaces/category.interface';

export const getCategoriesRepo = async ():Promise<ICategory[]> => {
  const resp = await AppDataSource.getRepository<ICategory>(Categories).find();
  if (!resp) throw new Error('No se encontraron categorías');
  return resp;
};
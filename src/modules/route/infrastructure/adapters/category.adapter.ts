//Conexion
import { AppDataSource } from '../../../../config/typeorm.config';
import { Categories } from '../../../../shared/entities/Categories';

//Interfaces
import { ICategory } from '../../domain/interfaces/createRoute.interface';
import { ICategoryOutputPort } from '../ports/category.port';


const connection = AppDataSource.getRepository<ICategory>(Categories);

export class CategoriesRepoAdapter implements ICategoryOutputPort {
  async getCategories(): Promise<ICategory[]> {
    return await connection.find();
  }
}

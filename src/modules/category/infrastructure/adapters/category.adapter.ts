//tyeorm
import { AppDataSource } from "@/config/typeorm.config";

//repositories
import { Categories } from "@/shared/entities/Categories";

//interfaces
import { ICategoryOutputPort } from "@/modules/category/domain/ports/category.port";
import { ICategory } from "@/shared/interfaces/entities/category.interface";


const connection = AppDataSource.getRepository<ICategory>(Categories);

export class CategoriesRepoAdapter implements ICategoryOutputPort {
  async getCategories(): Promise<ICategory[]> {
    return await connection.find();
  }
}

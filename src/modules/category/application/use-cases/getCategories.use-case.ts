
//Interfaces
import { IResp } from "../../../../shared/interfaces/respUtils.interface";

//Repositories
import { getCategoriesRepo } from "../../infrastructure/adapters/output/category.repo";

//Utils
import { resp } from "../../../../shared/utils/resp.util";
import { ICategories } from "../../domain/interfaces/category.interface";

//Error
import { ErrorResp } from "../../../../shared/utils/error.util";
import { ErrorsCategory } from "../../domain/errors/category.errors";



export const getCategoriesUseCase = async (): Promise<IResp<ICategories>> => {
  const response = await getCategoriesRepo();

  if (!response) {
    throw ErrorsCategory.ErrorGettingCategories;
  }
  return resp(200, { categories: response });
}

//Interfaces
import { IResp } from "../../../../shared/interfaces/respUtils.interface";

//Repositories
import { getCategoriesRepo } from "../../infrastructure/adapters/output/category.repo";

//Utils
import { resp } from "../../../../shared/utils/resp.util";
import { ICategories } from "../../domain/interfaces/category.interface";

//Error
import { ErrorResp } from "../../../../shared/utils/error.util";



export const getCategoriesUseCase = async (): Promise<IResp<ICategories>> => {
  const response = await getCategoriesRepo();

  if (!response) {
    throw new ErrorResp(404, "Categories not found");
  }
  return resp(200, { categories: response });
}
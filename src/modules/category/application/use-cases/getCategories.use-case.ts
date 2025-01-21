//Interfaces
import { IResp } from "../../../../shared/interfaces/respUtils.interface";
import { ICategories } from "../../domain/interfaces/category.interface";

//Utils
import { resp } from "../../../../shared/utils/resp.util";

//Error
import { ErrorsCategory } from "../../domain/errors/category.errors";
import { ICategoryOutputPort } from "../../infrastructure/ports/category.port";
import { CategoriesRepoAdapter } from "../../infrastructure/adapters/category.adapter";
import { IUseCaseGenericInput } from "../../../../shared/interfaces/useCaseGenericInpur.interface";
import { IUseCaseData } from "../../../../presentation/ports/genericInput.port";

export const getCategoriesUseCase = async ({ repo }: IUseCaseData<ICategoryOutputPort>): Promise<IResp<ICategories>> => {

  const response = await repo.getCategories();

  if (!response) {
    throw ErrorsCategory.ErrorGettingCategories;
  }
  return resp(200, { categories: response });
};

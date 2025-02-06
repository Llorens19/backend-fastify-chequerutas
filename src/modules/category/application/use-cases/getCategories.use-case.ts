//interfaces
import { ICategories } from "@/modules/category/domain/interfaces/category.interface";
import { ICategoryOutputPort } from "@/modules/category/domain/repo/category.port";
import { IResp } from "@/shared/interfaces/respUtils.interface";
import { IUseCaseData } from "@/shared/interfaces/useCaseGenericInpur.interface";

//errors
import { ErrorsCategory } from "@/modules/category/domain/errors/category.errors";

//utils
import { resp } from "@/shared/utils/resp.util";


export const getCategoriesUseCase = async ({ repo }: IUseCaseData<ICategoryOutputPort>): Promise<IResp<ICategories>> => {

  const response = await repo.getCategories();

  if (!response) {
    throw ErrorsCategory.ErrorGettingCategories;
  }
  return resp(200, { categories: response });
};

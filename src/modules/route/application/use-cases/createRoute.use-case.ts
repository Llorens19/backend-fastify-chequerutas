import { ICategories } from "@/modules/category/domain/interfaces/category.interface";
import { ICategoryOutputPort } from "@/modules/category/infrastructure/ports/category.port";
import { ICreateRouteInput } from "@/modules/route/domain/interfaces/createRoute.interface";
import { IResp } from "@/shared/interfaces/respUtils.interface";
import { IUseCaseData } from "@/shared/interfaces/useCaseGenericInpur.interface";
import { calculateDistance } from "@/shared/utils/calculateDistance.util";
import { resp } from "@/shared/utils/resp.util";


export const createRouteUseCase = async ({ repo, request }: IUseCaseData<ICategoryOutputPort>): Promise<IResp<ICategories>> => {
  const { idUser } = request.middlewareData!;
  const { title, description, coordinates, level, duration, idCategory, isPublic } = request.body as ICreateRouteInput;
  const distance = calculateDistance(coordinates);
  const startCoordinates = coordinates[0];

  return resp(200, { categories: response });
};

import { IGetAllRoutesOutput } from "@/modules/route/domain/interfaces/getAllRoutes.interface";
import { IRouteOutputPort } from "@/modules/route/infrastructure/ports/route.port";
import { IRoute } from "@/shared/interfaces/entities/route.interface";
import { IResp } from "@/shared/interfaces/respUtils.interface";
import { IUseCaseData } from "@/shared/interfaces/useCaseGenericInpur.interface";
import { resp } from "@/shared/utils/resp.util";


export const getAllRoutesUseCase = async ({ repo, request }: IUseCaseData<IRouteOutputPort>): Promise<IResp<IGetAllRoutesOutput>> => {
  const query = request.query;

  const routes = await repo.getAllRoutes(query);

  return resp(200, routes);
};

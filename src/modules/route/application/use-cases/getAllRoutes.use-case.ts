import { ErrorsRoute } from "@/modules/route/domain/errors/route.errors";
import { IGetAllRoutesOutput } from "@/modules/route/domain/interfaces/getAllRoutes.interface";
import { IRouteOutputPort } from "@/modules/route/domain/repo/route.port";
import { IResp } from "@/shared/interfaces/respUtils.interface";
import { IUseCaseData } from "@/shared/interfaces/useCaseGenericInpur.interface";
import { resp } from "@/shared/utils/resp.util";


export const getAllRoutesUseCase = async ({ repo, request }: IUseCaseData<IRouteOutputPort>): Promise<IResp<IGetAllRoutesOutput>> => {
  const query = request.query;

  const routes = await repo.getAllRoutes(query);

  if(!routes) throw ErrorsRoute.ErrorGettingRoutes;

  return resp(200, routes);
};

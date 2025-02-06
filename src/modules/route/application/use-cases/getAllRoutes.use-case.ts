//Interfaces
import { IGetAllRoutesOutput, IQueryParams } from "@/modules/route/domain/interfaces/getAllRoutes.interface";
import { IRouteOutputPort } from "@/modules/route/domain/repo/route.port";
import { IResp } from "@/shared/interfaces/respUtils.interface";
import { IUseCaseData } from "@/shared/interfaces/useCaseGenericInpur.interface";

//Errors
import { ErrorsRoute } from "@/modules/route/domain/errors/route.errors";

//Utils
import { resp } from "@/shared/utils/resp.util";


export const getAllRoutesUseCase = async ({ repo, request }: IUseCaseData<IRouteOutputPort>): Promise<IResp<IGetAllRoutesOutput>> => {
  const query = request.query as IQueryParams;

  const routes = await repo.getAllRoutes(query);

  if(!routes) throw ErrorsRoute.ErrorGettingRoutes;

  return resp(200, routes);
};

//Interfaces
import { IGetAllRoutesOutput, IQueryParams } from "@/modules/route/domain/interfaces/getAllRoutes.interface";
import { IRouteOutputPort } from "@/modules/route/domain/repo/route.port";
import { IResp } from "@/shared/interfaces/respUtils.interface";
import { IUseCaseData } from "@/shared/interfaces/useCaseGenericInpur.interface";

//Errors
import { ErrorsRoute } from "@/modules/route/domain/errors/route.errors";

//Utils
import { resp } from "@/shared/utils/resp.util";


export const getRouteLocationsUseCase = async ({ repo, request }: IUseCaseData<IRouteOutputPort>): Promise<IResp<(string | null)[]>> => {

  const routes = await repo.getRouteLocations();

  if(!routes) throw ErrorsRoute.ErrorGettingRoutes;

  return resp(200, routes);
};

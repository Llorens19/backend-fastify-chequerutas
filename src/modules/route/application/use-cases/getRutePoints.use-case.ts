//Interfaces
import { IQueryParams } from "@/modules/route/domain/interfaces/getAllRoutes.interface";
import { IRouteOutputPort } from "@/modules/route/domain/repo/route.port";
import { IResp } from "@/shared/interfaces/respUtils.interface";
import { IUseCaseData } from "@/shared/interfaces/useCaseGenericInpur.interface";
import { IRotePointsResp } from "@/modules/route/domain/interfaces/getRoutePoints.use-case";

//Errors
import { ErrorsRoute } from "@/modules/route/domain/errors/route.errors";

//Utils
import { resp } from "@/shared/utils/resp.util";



export const getRoutePointsUseCase = async ({ repo, request }: IUseCaseData<IRouteOutputPort>): Promise<IResp<IRotePointsResp>> => {
  const query = request.query as IQueryParams;

  const points = await repo.getRoutePoints(query);

  if(!points) throw ErrorsRoute.ErrorGettingPoints;

  return resp(200, points);
};

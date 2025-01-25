//Interfaces
import { IGetRouteByIdParams } from "@/modules/route/domain/interfaces/getRouteById.interface";
import { IRouteResp } from "@/modules/route/domain/interfaces/route.interface";
import { IRouteOutputPort } from "@/modules/route/domain/repo/route.port";
import { IResp } from "@/shared/interfaces/respUtils.interface";
import { IUseCaseData } from "@/shared/interfaces/useCaseGenericInpur.interface";

//Dtos
import { routeDTO } from "@/modules/route/application/dto/route.dto";

//Errors
import { ErrorsRoute } from "@/modules/route/domain/errors/route.errors";

//Utils
import { resp } from "@/shared/utils/resp.util";


export const getRouteByIdUseCase = async ({ repo, request }: IUseCaseData<IRouteOutputPort>): Promise<IResp<IRouteResp>> => {
  const { id } = request.params as IGetRouteByIdParams;

  const route = await repo.getRouteById(id);

  if (!route) ErrorsRoute.RouteNotFound;

  return resp(200, routeDTO(route!));
};
//Interfaces
import { IDeleteRouteParams } from "@/modules/route/domain/interfaces/deleteRoute.interface";
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

export const deleteRouteUseCase = async ({ repo, request }: IUseCaseData<IRouteOutputPort>): Promise<IResp<IRouteResp>> => {
  const { id: idRoute } = request.params as IDeleteRouteParams;

  const { idUser } = request.middlewareData!;

  const routeSearched = await repo.getRouteById(idRoute);

  if (!routeSearched) throw ErrorsRoute.RouteNotFound;

  if (routeSearched.idUser !== idUser) throw ErrorsRoute.RouteNotBelongToUser;

  const routeDeleted = await repo.deleteRoute(idRoute);

  if (!routeDeleted) throw ErrorsRoute.RouteNotFound;

  return resp(200, routeDTO(routeDeleted));
};

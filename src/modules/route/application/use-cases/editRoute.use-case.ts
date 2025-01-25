import { edirRouteDTO } from "@/modules/route/application/dto/editRoute.dto";
import { routeDTO } from "@/modules/route/application/dto/route.dto";
import { ErrorsRoute } from "@/modules/route/domain/errors/route.errors";
import { IEditRouteInput, IEditRouteParams } from "@/modules/route/domain/interfaces/editRoute.interface";
import { IRouteResp } from "@/modules/route/domain/interfaces/route.interface";
import { IRouteOutputPort } from "@/modules/route/domain/repo/route.port";
import { IResp } from "@/shared/interfaces/respUtils.interface";
import { IUseCaseData } from "@/shared/interfaces/useCaseGenericInpur.interface";
import { resp } from "@/shared/utils/resp.util";

export const editRouteUseCase = async ({ repo, request }: IUseCaseData<IRouteOutputPort>): Promise<IResp<IRouteResp>> => {
  const { id: idRoute } = request.params as IEditRouteParams;

  const { idUser } = request.middlewareData!;

  const routeSearched = await repo.getRouteById(idRoute);

  if (!routeSearched) throw ErrorsRoute.RouteNotFound;

  if (routeSearched.idUser !== idUser) throw ErrorsRoute.RouteNotBelongToUser;

  const routeData = request.body as IEditRouteInput;

  console.log(routeData);

  const editResp = await repo.editRoute(edirRouteDTO({ ...routeData, idRoute }));

  if (!editResp) throw ErrorsRoute.ErrorEditingRoute;

  const routeEdited = await repo.getRouteById(idRoute);

  if (!routeEdited) throw ErrorsRoute.RouteNotFound;



  return resp(200, routeDTO(routeEdited));
};

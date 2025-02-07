//Interfaces
import { IRouteOutputPort } from "@/modules/route/domain/repo/route.port";
import { IResp } from "@/shared/interfaces/respUtils.interface";
import { IUseCaseData } from "@/shared/interfaces/useCaseGenericInpur.interface";
import { IGetRoutesUserParams } from "@/modules/route/domain/interfaces/getRoutesUserPublic.interface";

//Errors
import { ErrorsRoute } from "@/modules/route/domain/errors/route.errors";

//Utils
import { resp } from "@/shared/utils/resp.util";
import { IRoutes } from "@/shared/interfaces/entities/route.interface";



export const getRoutesUserPrivateUseCase = async ({ repo, request }: IUseCaseData<IRouteOutputPort>): Promise<IResp<IRoutes>> => {
  const { username } = request.params as IGetRoutesUserParams;
  const { username: usernameMiddleware } = request.middlewareData!;

  if (username !== usernameMiddleware) throw ErrorsRoute.ErrorGettingRoutes;

  const routes = await repo.getRoutesUserPrivate(username);

  if (!routes) throw ErrorsRoute.ErrorGettingRoutes;

  return resp(200, { routes });
};

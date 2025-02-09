//Interfaces
import { IRouteOutputPort } from "@/modules/route/domain/repo/route.port";
import { IResp } from "@/shared/interfaces/respUtils.interface";
import { IUseCaseData } from "@/shared/interfaces/useCaseGenericInpur.interface";

//Errors
import { ErrorsRoute } from "@/modules/route/domain/errors/route.errors";

//Utils
import { resp } from "@/shared/utils/resp.util";
import { IFavorite } from "@/shared/interfaces/entities/favorite.interface";
import { IUnFavoriteRouteParams } from "@/modules/route/domain/interfaces/unFavoriteRoute.interface";


export const unFavoriteRouteUseCase = async ({ repo, request }: IUseCaseData<IRouteOutputPort>): Promise<IResp<IFavorite>> => {
  const { idRoute } = request.params as IUnFavoriteRouteParams;
  const { idUser } = request.middlewareData!;

  const isFavorite = await repo.isFavorite(idRoute, idUser);

  if (!isFavorite) throw ErrorsRoute.YouAlreadyUnLikedThisRoute;

  const favourite = await repo.unFavoriteRoute(idRoute, idUser);

  if (!favourite) throw ErrorsRoute.ErrorGettingRoutes;

  return resp(200, favourite);
};

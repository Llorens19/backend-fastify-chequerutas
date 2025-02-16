//Interfaces
import { IGetAllRoutesOutput, IQueryParams } from "@/modules/route/domain/interfaces/getAllRoutes.interface";
import { IRouteOutputPort } from "@/modules/route/domain/repo/route.port";
import { IResp } from "@/shared/interfaces/respUtils.interface";
import { IUseCaseData } from "@/shared/interfaces/useCaseGenericInpur.interface";

//Errors
import { ErrorsRoute } from "@/modules/route/domain/errors/route.errors";

//Utils
import { resp } from "@/shared/utils/resp.util";
import { IFavoriteRouteParams } from "@/modules/route/domain/interfaces/favoriteRoute.interface";
import { IFavorite } from "@/shared/interfaces/entities/favorite.interface";


export const favoriteRouteUseCase = async ({ repo, request }: IUseCaseData<IRouteOutputPort>): Promise<IResp<IFavorite>> => {
  const { idRoute } = request.params as IFavoriteRouteParams;
  const { idUser } = request.middlewareData!;

  const isFavorite = await repo.isFavorite(idRoute, idUser);

  if (isFavorite) throw ErrorsRoute.YouAlreadyLikedThisRoute;

  const favourite = await repo.favoriteRoute(idRoute, idUser);

  if (!favourite) throw ErrorsRoute.ErrorGettingRoutes;

  return resp(200, favourite);
};

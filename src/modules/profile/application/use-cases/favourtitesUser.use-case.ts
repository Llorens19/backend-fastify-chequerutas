//Interfaces
import { IProfileOutputPort } from "@/modules/profile/domain/repo/profile.port";
import { IResp } from "@/shared/interfaces/respUtils.interface";
import { IUseCaseData } from "@/shared/interfaces/useCaseGenericInpur.interface";

//Utils
import { resp } from "@/shared/utils/resp.util";

//Error
import { IFavorite, IFavorites } from "@/shared/interfaces/entities/favorite.interface";


export const favoritesUserUseCase = async ({ repo, request }: IUseCaseData<IProfileOutputPort>): Promise<IResp<IFavorites>> => {

  const {idUser} = request.middlewareData!;

  const favorites = await repo.favoritesUser(idUser);

  return resp(200, {favorites});
};

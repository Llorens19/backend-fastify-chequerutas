//Interfaces
import { IProfileOutputPort } from "@/modules/profile/domain/repo/profile.port";
import { IResp } from "@/shared/interfaces/respUtils.interface";
import { IUseCaseData } from "@/shared/interfaces/useCaseGenericInpur.interface";
import { IFollower } from "@/shared/interfaces/entities/follower.interface";
import { IUnFollowParams } from "@/modules/profile/domain/interfaces/unfollow.interface";

//Utils
import { resp } from "@/shared/utils/resp.util";

//Error
import { ErrorsProfile } from "@/modules/profile/domain/errors/profile.errors";



export const unFollowUseCase = async ({ repo, request }: IUseCaseData<IProfileOutputPort>): Promise<IResp<IFollower>> => {

  const { idUnFollowed } = request.params as IUnFollowParams;

  const {idUser} = request.middlewareData!;

  if(idUnFollowed === idUser) throw ErrorsProfile.CantFollowYourself;

  const isFollowing = await repo.isFollowing(idUser, idUnFollowed);

  if(!isFollowing) throw ErrorsProfile.YouDontFollowThisUser;

  const unFollow= await repo.unFollowUser(idUser, idUnFollowed);

  if (!unFollow) throw ErrorsProfile.ProfileNotFound;

  return resp(200, unFollow);
};

//Interfaces
import { IProfileOutputPort } from "@/modules/profile/domain/repo/profile.port";
import { IResp } from "@/shared/interfaces/respUtils.interface";
import { IUseCaseData } from "@/shared/interfaces/useCaseGenericInpur.interface";
import { IFollowParams } from "@/modules/profile/domain/interfaces/follow.interface";
import { IFollower } from "@/shared/interfaces/entities/follower.interface";

//Utils
import { resp } from "@/shared/utils/resp.util";

//Error
import { ErrorsProfile } from "@/modules/profile/domain/errors/profile.errors";


export const followUseCase = async ({ repo, request }: IUseCaseData<IProfileOutputPort>): Promise<IResp<IFollower>> => {

  const { idFollowed } = request.params as IFollowParams;

  const {idUser} = request.middlewareData!;

  if(idFollowed === idUser) throw ErrorsProfile.CantFollowYourself;

  const isFollowing = await repo.isFollowing(idUser, idFollowed);

  if(isFollowing) throw ErrorsProfile.YouAlreadyFollowThisUser;

  const follow = await repo.followUser(idUser, idFollowed);

  if (!follow) throw ErrorsProfile.ProfileNotFound;

  return resp(200, follow);
};

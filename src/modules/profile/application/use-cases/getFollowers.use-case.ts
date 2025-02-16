//Interfaces
import { IGetProfileInput } from "@/modules/profile/domain/interfaces/getProfile.interface";
import { IProfileResp } from "@/modules/profile/domain/interfaces/profile.interface";
import { IProfileOutputPort } from "@/modules/profile/domain/repo/profile.port";
import { IResp } from "@/shared/interfaces/respUtils.interface";
import { IUseCaseData } from "@/shared/interfaces/useCaseGenericInpur.interface";

//Utils
import { resp } from "@/shared/utils/resp.util";

//Error
import { ErrorsProfile } from "@/modules/profile/domain/errors/profile.errors";

//DTO
import { profileDTO } from "@/modules/profile/application/dto/profile.dto";
import { IGetFollowersParams } from "@/modules/profile/domain/interfaces/getFollowers.interface";


// export const getFollowersUseCase = async ({ repo, request }: IUseCaseData<IProfileOutputPort>): Promise<IResp<IProfileResp>> => {

//   const { username } = request.params as IGetFollowersParams;

//   const response = await repo.getUserFollowers(username);

//   if (!response) {
//     throw ErrorsProfile.ProfileNotFound;
//   }
//   return resp(200, profileDTO(response));
// };

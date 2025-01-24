//Interfaces
import { IGetProfileInput } from "@/modules/profile/domain/interfaces/getProfile.interface";
import { IProfileResp } from "@/modules/profile/domain/interfaces/profile.interface";
import { IProfileOutputPort } from "@/modules/profile/infrastructure/ports/profile.port";
import { IResp } from "@/shared/interfaces/respUtils.interface";
import { IUseCaseData } from "@/shared/interfaces/useCaseGenericInpur.interface";

//Utils
import { resp } from "@/shared/utils/resp.util";

//Error
import { ErrorsProfile } from "@/modules/profile/domain/errors/profile.errors";

//DTO
import { profileDTO } from "@/modules/profile/domain/dto/profile.dto";


export const getProfileUseCase = async ({ repo, request }: IUseCaseData<IProfileOutputPort>): Promise<IResp<IProfileResp>> => {

  const { username } = request.params as IGetProfileInput;

  const response = await repo.getUserByUsername(username);

  if (!response) {
    throw ErrorsProfile.ProfileNotFound;
  }
  return resp(200, profileDTO(response));
};

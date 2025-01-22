//Interfaces
import { IResp } from "../../../../shared/interfaces/respUtils.interface";
import { IUseCaseData } from "../../../../shared/interfaces/useCaseGenericInpur.interface";
import { IGetProfileInput } from "../../domain/interfaces/getProfile.interface";
import { IProfileOutputPort } from "../../infrastructure/ports/profile.port";
import { IProfileResp } from "../../domain/interfaces/profile.interface";

//Utils
import { resp } from "../../../../shared/utils/resp.util";

//Error
import { ErrorsProfile } from "../../domain/errors/profile.errors";
import { profileDTO } from "../../domain/dto/profile.dto";



export const getProfileUseCase = async ({ repo, request }: IUseCaseData<IProfileOutputPort>): Promise<IResp<IProfileResp>> => {

  const { username } = request.params as IGetProfileInput;

  const response = await repo.getUserByUsername(username);

  if (!response) {
    throw ErrorsProfile.ProfileNotFound;
  }
  return resp(200, profileDTO(response));
};

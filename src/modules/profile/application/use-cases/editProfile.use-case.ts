//Interfaces
import { IResp } from "@/shared/interfaces/respUtils.interface";
import { IUseCaseData } from "@/shared/interfaces/useCaseGenericInpur.interface";
import { IProfileResp } from "@/modules/profile/domain/interfaces/profile.interface";
import { IProfileOutputPort } from "@/modules/profile/domain/repo/profile.port";
import { IEditProfileInput } from "@/modules/profile/domain/interfaces/editProfile.intput";

//Utils
import { resp } from "@/shared/utils/resp.util";

//Error
import { ErrorsProfile } from "@/modules/profile/domain/errors/profile.errors";

//DTO
import { profileDTO } from "@/modules/profile/application/dto/profile.dto";


export const editProfileUseCase = async ({ repo, request }: IUseCaseData<IProfileOutputPort>): Promise<IResp<IProfileResp>> => {

  const { idUser, username } = request.middlewareData!;
  const { redis } = request.server;
  const userChanges = request.body as IEditProfileInput;

  if (userChanges.admin) {
    await repo.editAdminProfile(idUser, userChanges);
  }

  if (userChanges.client) {
    await repo.editClientProfile(idUser, userChanges);
  }

  const response = await repo.editUserProfile(idUser, userChanges);

  if (!response) throw ErrorsProfile.ErrorEditProfile;

  const userUpdated = await repo.getUserByUsername(username);

  if (!userUpdated) throw ErrorsProfile.ErrorEditProfile;

  await redis.set(`user:${username}`, JSON.stringify(userUpdated), 'EX', Number(process.env.REDIS_EXPIRATION));

  return resp(200, profileDTO(userUpdated));
};

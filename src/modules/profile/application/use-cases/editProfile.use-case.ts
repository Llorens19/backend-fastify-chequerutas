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
import { IUserGeneric } from "../../../../shared/interfaces/entities/user.interface";
import { IEditProfileInput } from "../../domain/interfaces/editProfile.intput";



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

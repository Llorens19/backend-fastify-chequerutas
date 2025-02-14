//Interfaces
import { IResp } from "@/shared/interfaces/respUtils.interface";
import { IUseCaseData } from "@/shared/interfaces/useCaseGenericInpur.interface";
import { IProfileResp } from "@/modules/profile/domain/interfaces/profile.interface";
import { IProfileOutputPort } from "@/modules/profile/domain/repo/profile.port";
import { IEditProfileInput } from "@/modules/profile/domain/interfaces/editProfile.interface";

//Utils
import { resp } from "@/shared/utils/resp.util";

//Error
import { ErrorsProfile } from "@/modules/profile/domain/errors/profile.errors";

//DTO
import { profileDTO } from "@/modules/profile/application/dto/profile.dto";
import { IPremiumUserProps } from "@/modules/profile/domain/interfaces/premiumUser.interface";


export const premiumUserUseCase = async ({ repo, request }: IUseCaseData<IProfileOutputPort>): Promise<IResp<IProfileResp>> => {

  const { idUser, username } = request.middlewareData!;
  const { redis } = request.server;
  const { time } = request.body as IPremiumUserProps;

  if (!time) throw ErrorsProfile.ErrorPremiumUser;

  const premiumTime = new Date();

  let premiumLevel = 1;

  switch (time) {
    case '1y':
      premiumTime.setFullYear(premiumTime.getFullYear() + 1);

      break;
    case '1m':
      premiumTime.setMonth(premiumTime.getMonth() + 1);
      break;
    case '1d':
      premiumTime.setDate(premiumTime.getDate() + 1);
      break;
    case 'ilimited':
      premiumTime.setFullYear(9999);
      premiumLevel = 2;
      break;
    default:
      throw ErrorsProfile.ErrorPremiumUser;
  }

  const response = await repo.editUserPremium(idUser, premiumLevel, premiumTime);

  if (!response) throw ErrorsProfile.ErrorPremiumUser;

  const userUpdated = await repo.getUserByUsername(username);

  if (!userUpdated) throw ErrorsProfile.ErrorPremiumUser;

  await redis.set(`user:${username}`, JSON.stringify(userUpdated), 'EX', Number(process.env.REDIS_EXPIRATION));

  return resp(200, profileDTO(userUpdated));
};

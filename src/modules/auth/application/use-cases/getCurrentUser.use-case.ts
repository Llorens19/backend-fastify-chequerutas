//Interfaces
import { IUserResp } from "@/modules/auth/domain/interfaces/userResp.interface";
import { IAuthOutputPort } from "@/modules/auth/domain/port/auth.port";
import { IResp } from "@/shared/interfaces/respUtils.interface";
import { IUseCaseData } from "@/shared/interfaces/useCaseGenericInpur.interface";

//Dto
import { userDTO } from "@/modules/auth/application/dto/user.dto";

//Errors
import { ErrorsAuth } from "@/modules/auth/domain/errors/auth.errors";

//Utils
import { resp } from "@/shared/utils/resp.util";


export const getCurrentUserUseCase =  async ({request, repo}: IUseCaseData<IAuthOutputPort>): Promise<IResp<IUserResp>> => {
  const { email } = request.middlewareData!;
  const user = await repo.getUserByEmailRepo(email);
  if (!user) throw ErrorsAuth.UserNotFound;
  return resp(200, userDTO(user));
}
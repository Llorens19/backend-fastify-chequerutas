
import { IResp } from "../../../../shared/interfaces/respUtils.interface";
import { IUseCaseData } from "../../../../shared/interfaces/useCaseGenericInpur.interface";
import { resp } from "../../../../shared/utils/resp.util";
import { userDTO } from "../../domain/dto/user.dto";
import { ErrorsAuth } from "../../domain/errors/auth.errors";
import { IUserResp } from "../../domain/interfaces/userResp.interface";
import { IAuthOutputPort } from "../../infrastructure/port/auth.port";

export const getCurrentUserUseCase =  async ({request, repo}: IUseCaseData<IAuthOutputPort>): Promise<IResp<IUserResp>> => {
  const { email } = request.middlewareData as any; //! Crear interfaz para el middlewareData
  const user = await repo.getUserByEmailRepo(email);
  if (!user) throw ErrorsAuth.UserNotFound;
  return resp(200, userDTO(user));
}
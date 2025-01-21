import { IResp } from "../../../../shared/interfaces/respUtils.interface";
import { IUseCaseGenericInput } from "../../../../shared/interfaces/useCaseGenericInpur.interface";
import { resp } from "../../../../shared/utils/resp.util";
import { ErrorsAuth } from "../../domain/errors/auth.errors";
import { IUserResp } from "../../domain/interfaces/userResp.interface";
import { getUserByEmailRepo } from "../../infrastructure/adapters/auth.adapter";

export const getCurrentUserUseCase =  async (data: IUseCaseGenericInput): Promise<IResp<IUserResp>> => {
  const { email } = data.middlewareData as any; //! Crear interfaz para el middlewareData
  const user = await getUserByEmailRepo(email);
  if (!user) throw ErrorsAuth.UserNotFound;
  return resp(200, user);
}
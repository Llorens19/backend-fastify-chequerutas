//Interfaces
import { IAuthOutputPort } from "@/modules/auth/domain/repo/auth.port";
import { IResp } from "@/shared/interfaces/respUtils.interface";
import { IUseCaseData } from "@/shared/interfaces/useCaseGenericInpur.interface";

//Utils
import { resp } from "@/shared/utils/resp.util";


export const logoutUseCase = async ({ request, repo }: IUseCaseData<IAuthOutputPort>): Promise<IResp<{ state: boolean }>> => {

  const { refresh_authorization } = request.headers;

  if (refresh_authorization) await repo.deleteRefreshToken(refresh_authorization);

  return resp(200, { state: true });
}
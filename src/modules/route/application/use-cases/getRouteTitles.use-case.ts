//Interfaces
import { IRouteOutputPort } from "@/modules/route/domain/repo/route.port";
import { IResp } from "@/shared/interfaces/respUtils.interface";
import { IUseCaseData } from "@/shared/interfaces/useCaseGenericInpur.interface";

//Errors
import { ErrorsRoute } from "@/modules/route/domain/errors/route.errors";

//Utils
import { resp } from "@/shared/utils/resp.util";


export const getRouteTitlesUseCase = async ({ repo }: IUseCaseData<IRouteOutputPort>): Promise<IResp<string[]>> => {

  const titles = await repo.getRouteTitles();

  if (!titles) throw ErrorsRoute.ErrorGettingTitles;

  return resp(200, titles);
};

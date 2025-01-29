//Interfaces
import { IRouteOutputPort } from "@/modules/route/domain/repo/route.port";
import { IResp } from "@/shared/interfaces/respUtils.interface";
import { IUseCaseData } from "@/shared/interfaces/useCaseGenericInpur.interface";

//Errors
import { ErrorsRoute } from "@/modules/route/domain/errors/route.errors";

//Utils
import { resp } from "@/shared/utils/resp.util";
import { IGetRouteLocationOutput } from "@/modules/route/domain/interfaces/getRouteLocation.interface";


export const getRouteLocationsUseCase = async ({ repo }: IUseCaseData<IRouteOutputPort>): Promise<IResp<IGetRouteLocationOutput>> => {

  const locations = await repo.getRouteLocations();

  if (!locations) throw ErrorsRoute.ErrorGettingLocations;

  return resp(200, { locations });
};

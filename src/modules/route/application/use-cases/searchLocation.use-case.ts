//Interfaces
import { IGetAllRoutesOutput, IQueryParams } from "@/modules/route/domain/interfaces/getAllRoutes.interface";
import { IRouteOutputPort } from "@/modules/route/domain/repo/route.port";
import { IResp } from "@/shared/interfaces/respUtils.interface";
import { IUseCaseData } from "@/shared/interfaces/useCaseGenericInpur.interface";

//Errors
import { ErrorsRoute } from "@/modules/route/domain/errors/route.errors";

//Utils
import { resp } from "@/shared/utils/resp.util";
import { ISearchLocationsInput, ISearchLocationsOutput } from "@/modules/route/domain/interfaces/searchLocations.interface";


export const searchLocationsUseCase = async ({ repo, request }: IUseCaseData<IRouteOutputPort>): Promise<IResp<ISearchLocationsOutput>> => {
  const { search } = request.body as ISearchLocationsInput;

  console.log(search);

  const locations = await repo.getSearchedLocations(search);

  if (!locations) throw ErrorsRoute.ErrorGettingRoutes;

  const response = locations.map(location => ({
    value : location.idLocation,
    label : location.nLocation
  }));

  return resp(200, { locations: response });
};

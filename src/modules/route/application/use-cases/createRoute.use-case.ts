
import { routeDTO } from "@/modules/route/application/dto/route.dto";
import { ErrorsRoute } from "@/modules/route/domain/errors/route.errors";
import { ICreateRouteFieldsRepo, ICreateRouteInput } from "@/modules/route/domain/interfaces/createRoute.interface";
import { IRouteResp } from "@/modules/route/domain/interfaces/route.interface";
import { IRouteOutputPort } from "@/modules/route/infrastructure/ports/route.port";
import { Errors } from "@/shared/errors/errors.error";
import { IRoute } from "@/shared/interfaces/entities/route.interface";
import { IResp } from "@/shared/interfaces/respUtils.interface";
import { IUseCaseData } from "@/shared/interfaces/useCaseGenericInpur.interface";
import { calculateDistance } from "@/shared/utils/calculateDistance.util";
import { calculateGradient } from "@/shared/utils/calculateGradient.util";
import { generateSlug } from "@/shared/utils/generateSlug.util";
import { resp } from "@/shared/utils/resp.util";


export const createRouteUseCase = async ({ repo, request }: IUseCaseData<IRouteOutputPort>): Promise<IResp<IRouteResp>> => {
  const { idUser } = request.middlewareData!;
  const { title, description, coordinates, level, duration, idCategory, isPublic, location} = request.body as ICreateRouteInput;
  if(!title || !description || !coordinates || !level || !duration || !idCategory || !isPublic || !location) throw Errors.MissingFields;

  const distance = calculateDistance(coordinates);
  const startCoordinates = coordinates[0];
  const {positiveGradient,negativeGradient, cumulativeGradient}= calculateGradient(coordinates);

  const ruteData: ICreateRouteFieldsRepo = {
    idUser,
    title,
    description,
    coordinates,
    level,
    distance,
    duration,
    avergeRating: 0,
    startCoordinates,
    idCategory,
    slugRoute: generateSlug(title),
    isPublic,
    positiveGradient,
    negativeGradient,
    cumulativeGradient,
    location
  }

  const newRoute = await repo.createRoute(ruteData);

  if(!newRoute) throw ErrorsRoute.ErrorCreatingRoute;

  const route = await repo.getRouteById(newRoute.idRoute);

  if(!route) throw ErrorsRoute.ErrorCreatingRoute;

  return resp(200, routeDTO(route) );
};

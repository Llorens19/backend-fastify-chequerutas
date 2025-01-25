import { IEditRouteInput } from "@/modules/route/domain/interfaces/editRoute.interface";

export const edirRouteDTO = (route: IEditRouteInput): IEditRouteInput => {
  const { idRoute, title, description, level, idCategory, isPublic, location } = route;

  return {
    idRoute,
    title,
    description,
    level,
    idCategory,
    isPublic,
    location,
  };
}
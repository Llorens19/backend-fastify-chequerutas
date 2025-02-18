//Interfaces
import { FastifyInstance } from "fastify";

//Controller
import { genericController } from "@/presentation/adapters/genericController.adapter";

//Adapters
import { RouteRepoAdapter } from "@/modules/route/infrastructure/repoImplement/route.adapter";

//Use Cases
import { getAllRoutesUseCase } from "@/modules/route/application/use-cases/getAllRoutes.use-case";
import { getRouteByIdUseCase } from "@/modules/route/application/use-cases/getRouteById.use-case";
import { editRouteUseCase } from "@/modules/route/application/use-cases/editRoute.use-case";
import { deleteRouteUseCase } from "@/modules/route/application/use-cases/deleteRoute.use-case";
import { createRouteUseCase } from "@/modules/route/application/use-cases/createRoute.use-case";
import { getRouteLocationsUseCase } from "@/modules/route/application/use-cases/getRouteLocations.use-case";
import { getRouteTitlesUseCase } from "@/modules/route/application/use-cases/getRouteTitles.use-case";
import { getRoutePointsUseCase } from "@/modules/route/application/use-cases/getRutePoints.use-case";
import { getRoutesUserPublicUseCase } from "@/modules/route/application/use-cases/getRoutesUserPublic.use-case";
import { getRoutesUserPrivateUseCase } from "@/modules/route/application/use-cases/getRoutesUserPrivate.use-case";

//Middlewares
import verifyJWT from "@/shared/middlewares/verifyJWT.middleware";
import { favoriteRouteUseCase } from "@/modules/route/application/use-cases/favoriteRoute.use-case";
import { unFavoriteRouteUseCase } from "@/modules/route/application/use-cases/unFavoriteRoute.use-case";
import { searchLocationsUseCase } from "@/modules/route/application/use-cases/searchLocation.use-case";






const routeRepo = new RouteRepoAdapter();


const routeRoutes = (routes: FastifyInstance): void => {
  routes.post("/routes/locations/search", genericController(searchLocationsUseCase, routeRepo));
  routes.get("/routes/locations", genericController(getRouteLocationsUseCase, routeRepo));
  routes.post("/routes/favorite/:idRoute", { preHandler: verifyJWT }, genericController(favoriteRouteUseCase, routeRepo));
  routes.delete("/routes/unfavorite/:idRoute", { preHandler: verifyJWT }, genericController(unFavoriteRouteUseCase, routeRepo));
  routes.get("/routes/titles", genericController(getRouteTitlesUseCase, routeRepo));
  routes.get("/routes/points", genericController(getRoutePointsUseCase, routeRepo));
  routes.get("/routes/:username/public", genericController(getRoutesUserPublicUseCase, routeRepo));
  routes.get("/routes/:username/private", { preHandler: verifyJWT }, genericController(getRoutesUserPrivateUseCase, routeRepo));
  routes.get("/routes/:id", genericController(getRouteByIdUseCase, routeRepo));
  routes.get("/routes", genericController(getAllRoutesUseCase, routeRepo));
  routes.post("/routes",  { preHandler: verifyJWT }, genericController(createRouteUseCase, routeRepo));
  routes.put("/routes/:id", { preHandler: verifyJWT }, genericController(editRouteUseCase, routeRepo));
  routes.delete("/routes/:id", { preHandler: verifyJWT }, genericController(deleteRouteUseCase, routeRepo));
};

export default routeRoutes;

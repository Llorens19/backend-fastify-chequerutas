//Interfaces
import { FastifyInstance } from "fastify";

//Controller
import { genericController } from "../../../presentation/adapters/genericController.adapter";
import { createRouteUseCase } from "@/modules/route/application/use-cases/createRoute.use-case";
import { RouteRepoAdapter } from "@/modules/route/infrastructure/repoImplement/route.adapter";
import verifyJWT from "@/shared/middlewares/verifyJWT.middleware";
import { getAllRoutesUseCase } from "@/modules/route/application/use-cases/getAllRoutes.use-case";
import { getRouteByIdUseCase } from "@/modules/route/application/use-cases/getRouteById.use-case";

//Use Cases
const routeRepo = new RouteRepoAdapter();


const routeRoutes = (routes: FastifyInstance): void => {
  routes.post("/routes",  { preHandler: verifyJWT }, genericController(createRouteUseCase, routeRepo));
  routes.get("/routes", genericController(getAllRoutesUseCase, routeRepo));
  routes.get("/routes/:id", genericController(getRouteByIdUseCase, routeRepo));
};

export default routeRoutes;

//Interfaces
import { FastifyInstance } from "fastify";

//Controller
import { genericController } from "../../../presentation/adapters/genericController.adapter";
import { createRouteUseCase } from "@/modules/route/application/use-cases/createRoute.use-case";
import { RouteRepoAdapter } from "@/modules/route/infrastructure/adapters/route.adapter";
import verifyJWT from "@/shared/middlewares/verifyJWT.middleware";

//Use Cases
const routeRepo = new RouteRepoAdapter();


const routeRoutes = (routes: FastifyInstance): void => {
  routes.post("/routes",  { preHandler: verifyJWT }, genericController(createRouteUseCase, routeRepo));
};

export default routeRoutes;

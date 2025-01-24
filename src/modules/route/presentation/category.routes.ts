//Interfaces
import { FastifyInstance } from "fastify";

//Controller
import { genericController } from "../../../presentation/adapters/genericController.adapter";

//Use Cases


const categoryRoutes = (routes: FastifyInstance): void => {
  routes.post("/routes", genericController(getCategoriesUseCase, categoriesPort));
};

export default categoryRoutes;

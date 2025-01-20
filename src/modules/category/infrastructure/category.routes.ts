//Interfaces
import { FastifyInstance } from "fastify";

//Controller
import { genericController } from "../../../infraGlobal/adapters/input/genericController.adapter";

//Use Cases
import { getCategoriesUseCase } from "../application/use-cases/getCategories.use-case";


const categoryRoutes = (routes: FastifyInstance): void => {
    routes.get("/categories", genericController(getCategoriesUseCase));
};

export default categoryRoutes;

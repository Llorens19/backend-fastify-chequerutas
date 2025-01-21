//Interfaces
import { FastifyInstance } from "fastify";

//Controller
import { genericController } from "../../../presentation/adapters/genericController.adapter";

//Use Cases
import { getCategoriesUseCase } from "../application/use-cases/getCategories.use-case";
import { CategoriesRepoAdapter } from "../infrastructure/adapters/category.adapter";

const categoriesPort = new CategoriesRepoAdapter();

const categoryRoutes = (routes: FastifyInstance): void => {
  routes.get("/categories", genericController(getCategoriesUseCase, categoriesPort));
};

export default categoryRoutes;

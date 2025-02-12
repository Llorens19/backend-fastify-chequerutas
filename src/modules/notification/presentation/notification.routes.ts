//Interfaces
import { FastifyInstance } from "fastify";

//Adapters
import { CategoriesRepoAdapter } from "@/modules/category/infrastructure/repoImplement/category.adapter";
import { genericController } from "@/presentation/adapters/genericController.adapter";

//Use Cases
import { getCategoriesUseCase } from "@/modules/category/application/use-cases/getCategories.use-case";


const categoriesRepo= new CategoriesRepoAdapter();

const categoryRoutes = (routes: FastifyInstance): void => {
  routes.get("/categories", genericController(getCategoriesUseCase, categoriesRepo));
};

export default categoryRoutes;

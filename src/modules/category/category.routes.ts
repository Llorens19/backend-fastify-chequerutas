//Interfaces
import { FastifyInstance } from "fastify";

//Controller
import { getCategoriesController } from "./category.controller";


const categoryRoutes = (routes: FastifyInstance): void => {
    routes.get("/categories", getCategoriesController);
};


export default categoryRoutes;

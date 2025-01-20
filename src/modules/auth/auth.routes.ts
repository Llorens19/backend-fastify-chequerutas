//Interfaces
import { FastifyInstance } from "fastify";

//Controller
import { registerController } from "./auth.controller";


const authRoutes = (routes: FastifyInstance): void => {
    routes.post("/register", registerController);
};


export default authRoutes;

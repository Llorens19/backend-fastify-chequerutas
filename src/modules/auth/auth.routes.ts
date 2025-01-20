// Interfaces
import { FastifyInstance } from "fastify";

// Importamos los casos de uso
import { registerUseCase } from "./use-cases/register.use-case";
import { genericController } from "../../infraGlobal/adapters/input/genericController.adapter";

const authRoutes = (routes: FastifyInstance): void => {
  routes.post("/register", genericController(registerUseCase));
  // routes.post("/login", genericController(loginUseCase));
};

export default authRoutes;

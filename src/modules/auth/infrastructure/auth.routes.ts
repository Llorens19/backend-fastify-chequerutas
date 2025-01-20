// Interfaces
import { FastifyInstance } from "fastify";

// Use Cases
import { genericController } from "../../../infraGlobal/adapters/input/genericController.adapter";
import { registerUseCase } from "../application/use-cases/register.use-case";
import { loginUseCase } from "../application/use-cases/login.use-case";

const authRoutes = (routes: FastifyInstance): void => {
  routes.post("/register", genericController(registerUseCase));
  routes.post("/login", genericController(loginUseCase));
};

export default authRoutes;

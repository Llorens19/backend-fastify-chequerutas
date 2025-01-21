// Interfaces
import { FastifyInstance } from "fastify";

// Use Cases
import { registerUseCase } from "../application/use-cases/register.use-case";
import { loginUseCase } from "../application/use-cases/login.use-case";

// Controller
import { genericController } from "../../../presentation/adapters/genericController.adapter";
import { AuthRepoAdapter } from "../infrastructure/adapters/auth.adapter";

const authPort = new AuthRepoAdapter();

const authRoutes = (routes: FastifyInstance): void => {
  routes.post("/register", genericController(registerUseCase, authPort));
  routes.post("/login", genericController(loginUseCase, authPort));
};

export default authRoutes;

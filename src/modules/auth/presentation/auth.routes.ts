// Interfaces
import { FastifyInstance } from "fastify";

// Use Cases
import { registerUseCase } from "../application/use-cases/register.use-case";
import { loginUseCase } from "../application/use-cases/login.use-case";

// Controller
import { genericController } from "../../../presentation/adapters/genericController.adapter";
import { AuthRepoAdapter } from "../infrastructure/adapters/auth.adapter";
import verifyJWT from "../../../shared/middlewares/verifyJWT.middleware";
import { getCurrentUserUseCase } from "../application/use-cases/getCurrentUser.use-case";
import { getNewAccessToken } from "../application/use-cases/getNewAccessToken.use-case";

const authRepo = new AuthRepoAdapter();

const authRoutes = (routes: FastifyInstance): void => {
  routes.post("/register", genericController(registerUseCase, authRepo));
  routes.post("/login", genericController(loginUseCase, authRepo));
  routes.get("/current_user", { preHandler: verifyJWT }, genericController(getCurrentUserUseCase, authRepo));
  routes.get("/new_access_token", genericController(getNewAccessToken, authRepo));
};

export default authRoutes;
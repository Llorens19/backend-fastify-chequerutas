//interfaces
import { FastifyInstance } from "fastify";

//Adapters
import { AuthRepoAdapter } from "@/modules/auth/infrastructure/repoImplement/auth.adapter";
import { genericController } from "@/presentation/adapters/genericController.adapter";

//Use Cases
import { getCurrentUserUseCase } from "@/modules/auth/application/use-cases/getCurrentUser.use-case";
import { getNewAccessToken } from "@/modules/auth/application/use-cases/getNewAccessToken.use-case";
import { loginUseCase } from "@/modules/auth/application/use-cases/login.use-case";
import { registerUseCase } from "@/modules/auth/application/use-cases/register.use-case";


//middlewares
import verifyJWT from "@/shared/middlewares/verifyJWT.middleware";


const authRepo = new AuthRepoAdapter();

const authRoutes = (routes: FastifyInstance): void => {
  routes.post("/register", genericController(registerUseCase, authRepo));
  routes.post("/login", genericController(loginUseCase, authRepo));
  routes.get("/current_user", { preHandler: verifyJWT }, genericController(getCurrentUserUseCase, authRepo));
  routes.get("/new_access_token", genericController(getNewAccessToken, authRepo));
};

export default authRoutes;
//Interfaces
import { FastifyInstance } from "fastify";

//Adapters
import { ProfileRepoAdapter } from "@/modules/profile/infrastructure/repoImplement/profile.adapter";
import { genericController } from "@/presentation/adapters/genericController.adapter";

//Use Cases
import { editProfileUseCase } from "@/modules/profile/application/use-cases/editProfile.use-case";
import { getProfileUseCase } from "@/modules/profile/application/use-cases/getProfile.use-case";

//Middlewares
import verifyJWT from "@/shared/middlewares/verifyJWT.middleware";



const profilePort = new ProfileRepoAdapter();

const profileRoutes = (routes: FastifyInstance): void => {
  routes.get("/profile/:username", genericController(getProfileUseCase, profilePort));
  routes.put("/profile", { preHandler: verifyJWT }, genericController(editProfileUseCase, profilePort));
};

export default profileRoutes;

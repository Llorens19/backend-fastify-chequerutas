//Interfaces
import { FastifyInstance } from "fastify";

//Controller
import { genericController } from "../../../presentation/adapters/genericController.adapter";


//Use Cases
import { getProfileUseCase } from "../application/use-cases/getProfile.use-case";

//adapters
import { ProfileRepoAdapter } from "../infrastructure/adapters/profile.adapter";

const profilePort = new ProfileRepoAdapter();

const profileRoutes = (routes: FastifyInstance): void => {
  routes.get("/profile/:username", genericController(getProfileUseCase, profilePort));
};

export default profileRoutes;

//Interfaces
import { FastifyInstance } from "fastify";

//Adapters
import { ProfileRepoAdapter } from "@/modules/profile/infrastructure/repoImplement/profile.adapter";
import { genericController } from "@/presentation/adapters/genericController.adapter";

//Use Cases
import { editProfileUseCase } from "@/modules/profile/application/use-cases/editProfile.use-case";
import { getProfileUseCase } from "@/modules/profile/application/use-cases/getProfile.use-case";
import { followUseCase } from "@/modules/profile/application/use-cases/follow.use-case";

//Middlewares
import verifyJWT from "@/shared/middlewares/verifyJWT.middleware";
import { unFollowUseCase } from "@/modules/profile/application/use-cases/unfollow.use-case";
import { favoritesUserUseCase } from "@/modules/profile/application/use-cases/favourtitesUser.use-case";
import { premiumUserUseCase } from "@/modules/profile/application/use-cases/premiumUser.use-case";




const profilePort = new ProfileRepoAdapter();

const profileRoutes = (routes: FastifyInstance): void => {
  routes.get("/profile/favorites", { preHandler: verifyJWT }, genericController(favoritesUserUseCase, profilePort));
  routes.get("/profile/:username", genericController(getProfileUseCase, profilePort));
  routes.post("/profile/follow/:idFollowed", { preHandler: verifyJWT }, genericController(followUseCase, profilePort));
  routes.delete("/profile/unfollow/:idUnFollowed", { preHandler: verifyJWT }, genericController(unFollowUseCase, profilePort));
  routes.put("/profile", { preHandler: verifyJWT }, genericController(editProfileUseCase, profilePort));
  routes.put("/profile/premium", { preHandler: verifyJWT }, genericController(premiumUserUseCase, profilePort));
};

export default profileRoutes;

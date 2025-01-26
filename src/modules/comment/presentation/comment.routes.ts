//Interfaces
import { FastifyInstance } from "fastify";

//Adapters
import { genericController } from "@/presentation/adapters/genericController.adapter";

//Use Cases
import { createComment } from "@/modules/comment/application/use-cases/createComment.use-case";
import { CommentRepoAdapter } from "@/modules/comment/infrastructure/repoImplement/comment.adapter";
import verifyJWT from "@/shared/middlewares/verifyJWT.middleware";
import { getUserCommentsUseCase } from "@/modules/comment/application/use-cases/getUserComments.use-case";


const commentRepo= new CommentRepoAdapter();

const commentRoutes = (routes: FastifyInstance): void => {
  routes.post("/comments", { preHandler: verifyJWT }, genericController(createComment, commentRepo));
  routes.get("/comments/user", { preHandler: verifyJWT }, genericController(getUserCommentsUseCase, commentRepo));
};

export default commentRoutes;

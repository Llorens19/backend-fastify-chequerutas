//Interfaces
import { FastifyInstance } from "fastify";

//Adapters
import { CommentRepoAdapter } from "@/modules/comment/infrastructure/repoImplement/comment.adapter";

//Controller
import { genericController } from "@/presentation/adapters/genericController.adapter";

//Use Cases
import { createCommentUseCase } from "@/modules/comment/application/use-cases/createComment.use-case";
import { getUserCommentsUseCase } from "@/modules/comment/application/use-cases/getUserComments.use-case";
import { getRouteCommentsUseCase } from "@/modules/comment/application/use-cases/getRouteComments.use-case";

//middlewares
import verifyJWT from "@/shared/middlewares/verifyJWT.middleware";
import { getCommentByIdUseCase } from "@/modules/comment/application/use-cases/getCommentById.use-case";



const commentRepo= new CommentRepoAdapter();

const commentRoutes = (routes: FastifyInstance): void => {
  routes.post("/comments", { preHandler: verifyJWT }, genericController(createCommentUseCase, commentRepo));
  routes.get("/comments/user", { preHandler: verifyJWT }, genericController(getUserCommentsUseCase, commentRepo));
  routes.get("/comments/route/:id", genericController(getRouteCommentsUseCase, commentRepo));
  routes.get("/comments/:id", genericController(getCommentByIdUseCase, commentRepo));
};

export default commentRoutes;

//tyeorm
import { AppDataSource } from "@/config/typeorm.config";

//repositories
import { Comments } from "@/shared/entities/Comments";

//interfaces
import { ICommentOutputPort } from "@/modules/comment/domain/repo/comment.port";
import { IComment } from "@/shared/interfaces/entities/comment.interface";
import { ICreateCommentInput } from "@/modules/comment/domain/interfaces/createComment.interface";
import { ICommentResponse, ICommentsResponse } from "@/modules/comment/domain/interfaces/comment.interface";


const connectionComment = AppDataSource.getRepository<IComment>(Comments);

export class CommentRepoAdapter implements ICommentOutputPort {
  createComment = async (comment: ICreateCommentInput): Promise<IComment> => {
    return await connectionComment.save(comment);
  }

  getCommentById = async (idComment: string): Promise<ICommentResponse | null> => {
    return await connectionComment.findOne({
      relations: [
        "comments",
        "user",
        "route",
      ],
      where: {
        idComment,
      }
    });
  }

  getUserComments = async (idUser: string, query: any): Promise<ICommentsResponse> => {
    const resp = await connectionComment.findAndCount({
      relations: [
        "comments",
        "user",
        "route",
      ],
      where: {
        idUser,
      },
      take: query.limit,
      skip: query.offset,
    });

    const [comments, count] = resp;

    return { comments, count };

  }

  getRouteComments = async (idRoute: string, query: any): Promise<ICommentsResponse> => {
    const resp = await connectionComment.findAndCount({
      relations: [
        "comments",
        "user",
        "route",
      ],
      where: {
        idRoute,
      },
      take: query.limit,
      skip: query.offset,
    });

    const [comments, count] = resp;

    return { comments, count };
  }
}

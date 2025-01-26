import { ICommentResponse, ICommentsResponse } from "@/modules/comment/domain/interfaces/comment.interface";
import { ICreateCommentInput } from "@/modules/comment/domain/interfaces/createComment.interface";
import { IComment } from "@/shared/interfaces/entities/comment.interface";


export interface ICommentOutputPort {
  createComment(comment: ICreateCommentInput): Promise<IComment>;
  getCommentById(idComment: string): Promise<ICommentResponse | null>;
  getUserComments(idUser: string, query: any): Promise<ICommentsResponse>;
  getRouteComments(idRoute: string, query: any): Promise<ICommentsResponse>;
}

import { IComment } from "@/shared/interfaces/entities/comment.interface";

export interface ICreateCommentInput {
  idUser: string;
  idRoute: string;
  body: string;
  imgComment?: string;
  idParentComment?: IComment;
}
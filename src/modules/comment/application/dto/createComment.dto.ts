import { ICreateCommentInput } from "@/modules/comment/domain/interfaces/createComment.interface";

export const createCommentDTO = (comment: ICreateCommentInput): ICreateCommentInput => {
  return {
    idRoute: comment.idRoute,
    idUser: comment.idUser,
    body: comment.body,
    imgComment: comment.imgComment,
    idParentComment: comment.idParentComment
  };
};
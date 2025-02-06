//interfaces
import { IResp } from "@/shared/interfaces/respUtils.interface";
import { IUseCaseData } from "@/shared/interfaces/useCaseGenericInpur.interface";
import { ICommentOutputPort } from "@/modules/comment/domain/repo/comment.port";
import { ICommentResponse, ICommentsResponse } from "@/modules/comment/domain/interfaces/comment.interface";
import { IDeleteCommentParams } from "@/modules/comment/domain/interfaces/deleteComment.interface";

//errors
import { ErrorsComment } from "@/modules/comment/domain/errors/comment.errors";
import { Errors } from "@/shared/errors/errors.error";

//utils
import { resp } from "@/shared/utils/resp.util";



export const deleteCommentUseCase = async ({ repo, request }: IUseCaseData<ICommentOutputPort>): Promise<IResp<ICommentResponse>> => {

  const { idUser } = request.middlewareData!;
  const { id: idComment } = request.params as IDeleteCommentParams;

  if (!idComment) throw Errors.MissingFields;

  const commentSearched = await repo.getCommentById(idComment);

  if (!commentSearched) throw ErrorsComment.ErrorGettingComment;

  if (commentSearched.idUser !== idUser) throw ErrorsComment.YouAreNotTheOwner;

  const comment = await repo.deleteComment(idComment);

  if (!comment) throw ErrorsComment.ErrorGettingComments;

  return resp(200, comment);
};

//interfaces
import { IResp } from "@/shared/interfaces/respUtils.interface";
import { IUseCaseData } from "@/shared/interfaces/useCaseGenericInpur.interface";
import { ICommentOutputPort } from "@/modules/comment/domain/repo/comment.port";
import { ICommentResponse } from "@/modules/comment/domain/interfaces/comment.interface";

//errors
import { ErrorsComment } from "@/modules/comment/domain/errors/comment.errors";
import { Errors } from "@/shared/errors/errors.error";

//utils
import { resp } from "@/shared/utils/resp.util";
import { IGetCommentByIdParams } from "@/modules/comment/domain/interfaces/getCommentById.interface";




export const getCommentByIdUseCase = async ({ repo, request }: IUseCaseData<ICommentOutputPort>): Promise<IResp<ICommentResponse>> => {

  const {id: idComment} = request.params as IGetCommentByIdParams;

  if (!idComment) throw Errors.MissingFields;


  const comment = await repo.getCommentById(idComment);

  if (!comment) ErrorsComment.ErrorGettingComment;


  return resp(200, comment!);
};
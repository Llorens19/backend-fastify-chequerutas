//interfaces
import { IResp } from "@/shared/interfaces/respUtils.interface";
import { IUseCaseData } from "@/shared/interfaces/useCaseGenericInpur.interface";
import { ICreateCommentInput } from "@/modules/comment/domain/interfaces/createComment.interface";
import { ICommentOutputPort } from "@/modules/comment/domain/repo/comment.port";
import { ICommentResponse } from "@/modules/comment/domain/interfaces/comment.interface";

//errors
import { ErrorsComment } from "@/modules/comment/domain/errors/comment.errors";
import { Errors } from "@/shared/errors/errors.error";

//utils
import { resp } from "@/shared/utils/resp.util";

//dto
import { createCommentDTO } from "@/modules/comment/application/dto/createComment.dto";




export const createCommentUseCase = async ({ repo, request }: IUseCaseData<ICommentOutputPort>): Promise<IResp<ICommentResponse>> => {

  const commentData = request.body as ICreateCommentInput;
  const { idUser } = request.middlewareData!;

  const { body, idRoute } = commentData;

  if (!body || !idRoute) throw Errors.MissingFields;

  const commentDTO = createCommentDTO(commentData);

  const response = await repo.createComment({ ...commentDTO, idUser });
  if (!response) ErrorsComment.ErrorCreatingComment;

  const comment = await repo.getCommentById(response.idComment);

  if (!comment) ErrorsComment.ErrorGettingComment;


  return resp(200, comment!);
};

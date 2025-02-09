//interfaces
import { IResp } from "@/shared/interfaces/respUtils.interface";
import { IUseCaseData } from "@/shared/interfaces/useCaseGenericInpur.interface";
import { ICommentOutputPort } from "@/modules/comment/domain/repo/comment.port";
import { ICommentsResponse } from "@/modules/comment/domain/interfaces/comment.interface";

//errors
import { ErrorsComment } from "@/modules/comment/domain/errors/comment.errors";

//utils
import { resp } from "@/shared/utils/resp.util";
import { IGetRouteCommentsParams } from "@/modules/comment/domain/interfaces/getRouteComments.interface";
import { Errors } from "@/shared/errors/errors.error";



export const getRouteCommentsUseCase = async ({ repo, request }: IUseCaseData<ICommentOutputPort>): Promise<IResp<ICommentsResponse>> => {

  const { query } = request;

  const { id :idRoute } = request.params as IGetRouteCommentsParams;

  if (!idRoute) throw Errors.MissingFields;

  const comments = await repo.getRouteComments(idRoute, query);

  console.log(comments);

  if (!comments) throw ErrorsComment.ErrorGettingComments;

  return resp(200, comments);
};

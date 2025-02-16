//interfaces
import { IResp } from "@/shared/interfaces/respUtils.interface";
import { IUseCaseData } from "@/shared/interfaces/useCaseGenericInpur.interface";
import { ICommentOutputPort } from "@/modules/comment/domain/repo/comment.port";
import { ICommentsResponse } from "@/modules/comment/domain/interfaces/comment.interface";

//errors
import { ErrorsComment } from "@/modules/comment/domain/errors/comment.errors";

//utils
import { resp } from "@/shared/utils/resp.util";



export const getUserCommentsUseCase = async ({ repo, request }: IUseCaseData<ICommentOutputPort>): Promise<IResp<ICommentsResponse>> => {

  // const { idUser } = request.middlewareData!;
  const { username } = request.params as { username: string };
  const { query } = request;

  const comments = await repo.getUserComments(username, query);

  if (!comments) throw ErrorsComment.ErrorGettingComments;

  return resp(200, comments);
};

import { IComment } from "@/shared/interfaces/entities/comment.interface";
import { IUser } from "@/shared/interfaces/entities/user.interface";

export interface ICommentResponse extends IComment{
  user: IUser;
  comments: IComment[];
}
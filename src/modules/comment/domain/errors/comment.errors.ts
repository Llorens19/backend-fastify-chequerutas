import { ErrorResp } from "@/shared/utils/error.util";


export const ErrorsComment = {
  ErrorCreatingComment: new ErrorResp(500, 'ErrorCreatingComment', 'Error creating comment'),
  ErrorGettingComment: new ErrorResp(500, 'ErrorGettingComment', 'Error getting comment'),
  ErrorGettingComments: new ErrorResp(500, 'ErrorGettingComments', 'Error getting comments'),
  YouAreNotTheOwner: new ErrorResp(403, 'YouAreNotTheOwner', 'You are not the owner of this comment'),
  ErrorDeletingComment: new ErrorResp(500, 'ErrorDeletingComment', 'Error deleting comment'),
  CommentNotFound: new ErrorResp(404, 'CommentNotFound', 'Comment not found'),

}
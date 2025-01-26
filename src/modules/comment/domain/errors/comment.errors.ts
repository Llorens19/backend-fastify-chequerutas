import { ErrorResp } from "@/shared/utils/error.util";


export const ErrorsComment = {
  ErrorCreatingComment: new ErrorResp(500, 'ErrorCreatingComment', 'Error creating comment'),
  ErrorGettingComment: new ErrorResp(500, 'ErrorGettingComment', 'Error getting comment'),

}
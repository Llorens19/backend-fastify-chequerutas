import { ErrorResp } from "@/shared/utils/error.util";


export const ErrorsCategory = {
  ErrorGettingCategories: new ErrorResp(500, 'ErrorGettingCategories', 'Error getting categories'),

}
import { ErrorResp } from "@/shared/utils/error.util";


export const ErrorsRoute = {
  ErrorCreatingRoute: new ErrorResp(500, 'ErrorCreatingRoute', 'Error creating route')
}
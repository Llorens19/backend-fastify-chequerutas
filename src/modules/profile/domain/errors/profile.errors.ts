import { ErrorResp } from "../../../../shared/utils/error.util";

export const ErrorsProfile = {
  ProfileNotFound: new ErrorResp(404, 'ProfileNotFound', 'Profile not found'),
  ErrorEditProfile: new ErrorResp(500, 'ErrorEditProfile', 'Error editing profile')

}
import { ErrorResp } from "@/shared/utils/error.util";


export const ErrorsProfile = {
  ProfileNotFound: new ErrorResp(404, 'ProfileNotFound', 'Profile not found'),
  ErrorEditProfile: new ErrorResp(500, 'ErrorEditProfile', 'Error editing profile'),
  CantFollowYourself: new ErrorResp(400, 'CantFollowYourself', 'You can not follow yourself'),
  CantUnFollowYourself: new ErrorResp(400, 'CantUnFollowYourself', 'You can not unfollow yourself'),
  YouAlreadyFollowThisUser: new ErrorResp(400, 'YouAlreadyFollowThisUser', 'You already follow this user'),
  YouDontFollowThisUser: new ErrorResp(400, 'YouDontFollowThisUser', 'You do not follow this user'),
  ErrorPremiumUser: new ErrorResp(500, 'ErrorPremiumUser', 'Error setting premium user'),
}
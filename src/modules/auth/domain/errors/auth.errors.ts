import { ErrorResp } from "@/shared/utils/error.util";

export const ErrorsAuth = {
  InvalidPassword: new ErrorResp(401, 'InvalidPassword', 'Invalid password'),
  UserNotFound: new ErrorResp(404, 'UserNotFound', 'User not found'),
  EmailAlreadyInUse: new ErrorResp(400, 'EmailAlreadyInUse', 'Email already in use'),
  ErrorRegisteringUser: new ErrorResp(500, 'ErrorRegisteringUser', 'Error registering user'),
  ErrorGettingRegisteredUser: new ErrorResp(500, 'ErrorGettingRegisteredUser', 'Error getting registered user')
}

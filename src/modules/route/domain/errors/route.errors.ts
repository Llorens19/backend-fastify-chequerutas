import { ErrorResp } from "@/shared/utils/error.util";


export const ErrorsRoute = {
  ErrorCreatingRoute: new ErrorResp(500, 'ErrorCreatingRoute', 'Error creating route'),
  ErrorGettingRoutes: new ErrorResp(500, 'ErrorGettingRoutes', 'Error getting routes'),
  ErrorEditingRoute: new ErrorResp(500, 'ErrorEditingRoute', 'Error editing route'),
  RouteNotFound: new ErrorResp(404, 'RouteNotFound', 'Route not found'),
  RouteNotBelongToUser: new ErrorResp(403, 'RouteNotBelongToUser', 'Route not belong to user'),
  ErrorGettingLocations: new ErrorResp(500, 'ErrorGettingLocations', 'Error getting locations'),
  ErrorGettingTitles: new ErrorResp(500, 'ErrorGettingTitles', 'Error getting titles'),
  ErrorGettingPoints: new ErrorResp(500, 'ErrorGettingPoints', 'Error getting points'),
  YouAlreadyLikedThisRoute: new ErrorResp(403, 'YouAlreadyLikedThisRoute', 'You already liked this route'),
  YouAlreadyUnLikedThisRoute: new ErrorResp(403, 'YouAlreadyUnLikedThisRoute', 'You already unliked this route'),
}
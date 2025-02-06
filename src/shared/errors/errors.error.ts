import { ErrorResp } from "@/shared/utils/error.util";

export const Errors = {
  MissingFields: new ErrorResp(400, 'MissingFields', 'Missing fields'),
  Unautorized: new ErrorResp(401, 'Unautorized', 'Unautorized'),
  Forbidden: new ErrorResp(403, 'Forbidden', 'Forbidden'),
}

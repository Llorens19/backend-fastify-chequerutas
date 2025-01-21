import { ErrorResp } from "../utils/error.util";


export const Errors = {
  MissingFields: new ErrorResp(400, 'MissingFields', 'Missing fields'),
}

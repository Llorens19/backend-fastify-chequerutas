import { IResp } from "../../../shared/interfaces/respUtils.interface";
import { IUseCaseGenericInput } from "../../../shared/interfaces/useCaseGenericInpur.interface";

export interface IUseCaseFunction {
  (request: IUseCaseGenericInput): Promise<IResp<object>>;
}
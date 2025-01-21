import { IResp } from "../../shared/interfaces/respUtils.interface";
import { IUseCaseGenericInput } from "../../shared/interfaces/useCaseGenericInpur.interface";

export interface IUseCaseData<T> {
  request?: IUseCaseGenericInput;
  repo: T;
}

export interface IUseCaseFunction<T> {
  (data: IUseCaseData<T>): Promise<IResp<object>>;
}

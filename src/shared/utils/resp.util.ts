import { IResp } from "../interfaces/respUtils.interface";

export const resp = <T>(status: number, result: T): IResp<T> => {
    return {
        status: status,
        result: result
    };
}
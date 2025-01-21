import Redis from "ioredis";

export interface IUseCaseData<T> {
  request: IUseCaseGenericInput;
  repo: T;
}

export interface IUseCaseGenericInput {
  body: unknown;
  params: unknown;
  query: unknown;
  headers: {
    authorization?: string;
  };
  server: {
    redis: Redis;
  };
  middlewareData?: {
    idUser: string;
    username: string;
    email: string;
    role: string;
  };
}

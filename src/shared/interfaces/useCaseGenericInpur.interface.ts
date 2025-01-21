import Redis from "ioredis";

export interface IUseCaseData<T> {
  request: IUseCaseGenericInput;
  repo: T;
}

export interface IUseCaseGenericInput {
  body: unknown;
  params: unknown;
  query: unknown;
  headers: unknown;
  server: {
    redis: Redis;
  };
  middlewareData?: unknown;
}

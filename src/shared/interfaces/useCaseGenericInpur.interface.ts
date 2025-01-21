import Redis from "ioredis";

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
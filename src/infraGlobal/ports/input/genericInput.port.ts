import { FastifyRequest } from "fastify";

export interface IUseCaseFunction {
  (request: FastifyRequest): Promise<{ status: number; result: object }>;
}
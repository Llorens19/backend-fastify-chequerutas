//Interfaces
import { FastifyReply, FastifyRequest } from "fastify";

//Services
import { registerUseCase } from "./use-cases/register.use-case";
import { ErrorResp } from "../../shared/utils/error.util";


export const registerController = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    try {
        const { status, result } = await registerUseCase(request);
        return reply.code(status).send(result);

    } catch (error: unknown) {

      if (error instanceof ErrorResp) {
        return reply.code(error.code).send({ error: error.message });
      }
      if (error instanceof Error) {
        console.log(error.message);
        return reply.code(500).send({ error: error.message });
      }
    }
};

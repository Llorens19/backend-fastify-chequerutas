//Interfaces
import { FastifyReply, FastifyRequest } from "fastify";

//Services
import { getCategoriesUseCase } from "./use-cases/getCategories.use-case";
import { ErrorResp } from "../../shared/utils/error.util";


export const getCategoriesController = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    try {
        const { status, result } = await getCategoriesUseCase();
        return reply.code(status).send(result);
    } catch (error: unknown) {
      if (error instanceof ErrorResp) {
        return reply.code(error.code).send({ error: error.message });
      }else{
        return reply.code(500).send({ error: "Internal server error" });
      }
    }
};

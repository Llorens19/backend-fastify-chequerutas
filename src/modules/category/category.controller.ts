//Interfaces
import { FastifyReply, FastifyRequest } from "fastify";

//Services
import { getCategoriesUseCase } from "./use-cases/getCategories.use-case";


export const getCategoriesController = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    try {
        const { status, result } = await getCategoriesUseCase();
        return reply.code(status).send(result);
    } catch (error) {
        console.error("Error en getCategoriesController", error);
        return reply.code(500).send({ error: "Ocurrió un error" });
    }
};

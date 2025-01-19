import 'reflect-metadata';
import Fastify from "fastify";
import cors from "@fastify/cors";
import { AppDataSource } from "../data-source";
import userRecruiterRoutes from "../userRecruiter/userRecruiter.router";
import inscripionRoutes from "../inscriptions/inscription.router";

const app = Fastify({ logger: true });
app.register(cors, {
    origin: (origin, callback) => {
        const urls_allowed = process.env.CORS_URLS.split(","); //!posible error

        //comprobamos que la url se encuentre en el array
        if (!origin || !urls_allowed.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("No permitido por CORS"), false);
        }
    }
});

app.register(userRecruiterRoutes);
app.register(inscripionRoutes);
const start = async () => {
    try {
        await fastify.listen({
            port: 4001,
            host: '0.0.0.0'
        });
        console.log('Fastify server running at http://0.0.0.0:4001');
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};
start();
import { config } from 'dotenv';
config();

import 'reflect-metadata';
import Fastify from "fastify";
import cors from "@fastify/cors";
import { AppDataSource } from "../config/typeorm.config";

console.log("urls_allowed", process.env.CORS_URLS);

const start = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Base de datos conectada");

    const app = Fastify({ logger: true });

    await app.register(cors, {
      origin: (origin, callback) => {
        const urls_allowed = process.env.CORS_URLS?.split(",") || [];


        if (!origin || urls_allowed.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error("No permitido por CORS"), false);
        }
      }
    });

    await app.listen({
      port: 4001,
      host: '0.0.0.0'
    });

    console.log('Servidor Fastify ejecutándose en http://0.0.0.0:4001');
  } catch (err) {
    console.error('Error al iniciar el servidor:', err);
    process.exit(1);
  }
};

start();
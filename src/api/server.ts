import { config } from 'dotenv';
config();

import 'reflect-metadata';
import Fastify from "fastify";
import cors from "@fastify/cors";
import { AppDataSource } from "../config/typeorm.config";

import categoryRoutes from '../modules/category/presentation/category.routes';
import authRoutes from '../modules/auth/presentation/auth.routes';
import fastifyRedis from '@fastify/redis';
import profileRoutes from '../modules/profile/presentation/profile.routes';

const start = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Base de datos conectada");

    const app = Fastify({ logger: false });

    await app.register(fastifyRedis, {
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
      password: process.env.REDIS_PASSWORD,
    });

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

    app.register(categoryRoutes);
    app.register(authRoutes);
    app.register(profileRoutes);

    await app.listen({
      port: Number(process.env.PORT) || 4001,
      host: process.env.HOST || '0.0.0.0',
    });

    console.log(`Servidor Fastify ejecutándose en http://${process.env.HOST}:${process.env.PORT}`);
  } catch (error: unknown) {
    console.error('Error al iniciar el servidor:', error);
    process.exit(1);
  }
};

start();
import { DataSource } from 'typeorm';

console.log("DB_HOST", process.env.DB_HOST);
console.log("DB_PORT", process.env.DB_PORT);
console.log("DB_USERNAME", process.env.DB_USERNAME);
console.log("DB_PASSWORD", process.env.DB_PASSWORD);
console.log("DB_DATABASE", process.env.DB_DATABASE);

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  logging: true,
  entities: [],
});
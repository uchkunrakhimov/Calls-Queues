import { createPool, Pool, PoolConnection } from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const defaultPort = 3306;
const parsedPort = parseInt(process.env.DB_PORT || defaultPort.toString(), 10);

const pool: Pool = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: parsedPort,
});

export const getConnection = async (): Promise<PoolConnection> => {
  return await pool.getConnection();
};

import { PoolOptions } from "mysql2/promise";
import { env } from "process";
import { config } from "dotenv";
config();

export const mysql2Options: PoolOptions = {
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_DATABASE,
    localAddress: env.DB_ADDRESS
}
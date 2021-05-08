import { Injectable } from "@nestjs/common";
import { createPool, Pool } from "mysql2/promise";
import { env } from "process";

/**
 * Wrapper for a pool of connections to a MySQL server.
 * Pool is accessed through `conn`.
 * Uses the MySQL2 driver.
 * @property conn
 */
@Injectable()
export class DB_MySQL {
    conn: Pool = createPool({
        user: env.DB_USER,
        password: env.DB_PASSWORD,
        database: env.DB_DATABASE,
        localAddress: env.DB_ADDRESS
    });
}
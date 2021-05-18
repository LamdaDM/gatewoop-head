import { Injectable } from "@nestjs/common";
import { createPool, Pool } from "mysql2/promise";
import { mysql2_Args } from "./mysql.arguments"

/**
 * Wrapper for a pool of connections to a MySQL server.
 * Pool is accessed through `conn`.
 * Uses the MySQL2 driver.
 */
@Injectable()
export class MySQLConnProvider {
    /**
     * Connection pool to MySQL, 
     * uses mysql2Options for the pool options.
     */
    conn: Pool = createPool(mysql2_Args);
}
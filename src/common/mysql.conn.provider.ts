import { Injectable } from "@nestjs/common";
import { createPool, Pool } from "mysql2/promise";
import { mysql2Options } from "./options/mysql2.options"

/**
 * Wrapper for a pool of connections to a MySQL server.
 * Pool is accessed through `conn`.
 * Uses the MySQL2 driver.
 */
@Injectable()
export class DB_MySQL {
    /**
     * Connection pool to MySQL, 
     * uses mysql2Options for the pool options.
     */
    conn: Pool = createPool(mysql2Options);
}
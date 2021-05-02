import { Injectable } from "@nestjs/common";
import { createPool, OkPacket, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { env } from "process";

@Injectable()
export class DB_MySQL {
    conn = createPool({
        user: env.DB_USER,
        password: env.DB_PASSWORD,
        database: env.DB_DATABASE,
        localAddress: env.DB_ADDRESS
    });
}

export type DBRes = RowDataPacket[]     |
                    RowDataPacket[][]   |
                    OkPacket            |
                    OkPacket[]          |
                    ResultSetHeader     
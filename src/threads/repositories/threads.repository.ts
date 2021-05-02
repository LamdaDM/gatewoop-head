import { Injectable } from "@nestjs/common";
import { DB_MySQL } from "src/config/mysql.conn.provider";

@Injectable()
export class ThreadsRepository{
    constructor(private connection_mysql: DB_MySQL){}
    private readonly client = this.connection_mysql.conn;
    
}
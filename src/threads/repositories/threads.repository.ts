import { Injectable } from "@nestjs/common";
import { MySQLConnProvider } from "src/common/mysql/mysql.provider";


@Injectable()
export class ThreadsRepository{
    constructor(private connection_mysql: MySQLConnProvider){}
    private readonly client = this.connection_mysql.conn;
    
}
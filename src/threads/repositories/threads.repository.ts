import { Injectable } from "@nestjs/common";
import { MySQLConnectionService } from "src/common/providers/mysql/mysql.service";


@Injectable()
export class ThreadsRepository{
    constructor(private connection_mysql: MySQLConnectionService){}
    private readonly client = this.connection_mysql.conn;
    
}
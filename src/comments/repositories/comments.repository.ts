import { Injectable } from "@nestjs/common";
import { OkPacket, ResultSetHeader, RowDataPacket } from "mysql2";
import { DBRes, DB_MySQL } from "src/config/mysql.conn.provider";
import { CreateCommentDTO } from "../dto/create-comment.dto";
import { EditCommentDTO } from "../dto/edit-comment.dto";

@Injectable()
export class CommentsRepository {
    constructor(private connection_mysql: DB_MySQL){}
    private readonly client = this.connection_mysql.conn;

    async editCommentByCommentID(COMMENT_ID: number, DTO: EditCommentDTO): Promise<OkPacket> {
        const [rows] = await this.client.execute<OkPacket>('');

        return rows;
    }

    async InsertCommentByThreadID(THREAD_ID: number, DTO: CreateCommentDTO): Promise<OkPacket> {
        const [rows] = await this.client.execute<OkPacket>('');

        return rows;
    }
}
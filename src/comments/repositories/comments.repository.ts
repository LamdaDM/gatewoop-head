import { Injectable } from "@nestjs/common";
import { OkPacket, ResultSetHeader, RowDataPacket } from "mysql2";
import { DB_MySQL } from "src/config/mysql.conn.provider";
import { ChangeAliasDTO } from "../dto/change-alias.dto";
import { CreateCommentDTO } from "../dto/create-comment.dto";
import { EditCommentDTO } from "../dto/edit-comment.dto";

@Injectable()
export class CommentsRepository {
    constructor(private connection_mysql: DB_MySQL){}
    private readonly client = this.connection_mysql.conn;

    async updateCommentContentByCommentID(COMMENT_ID: number, DTO: EditCommentDTO): Promise<OkPacket> {
        const [rows] = await this.client.execute<OkPacket>(
            '', 
            [
                COMMENT_ID,
                DTO.content,
                DTO.title
            ]
        );

        return rows;
    }

    async InsertCommentByThreadID(THREAD_ID: number, DTO: CreateCommentDTO): Promise<OkPacket> {
        const [rows] = await this.client.execute<OkPacket>(
            '', 
            [
                THREAD_ID,
                DTO.poster_id,
                DTO.parent_thread_id,
                DTO.parent_comment_id,
                DTO.alias,
                DTO.comment_title,
                DTO.content,
                DTO.timestamp
            ]
        );

        return rows;
    }

    async updateCommentAliasByCommentID(DTO: ChangeAliasDTO, ...COMMENT_ID: number[]): Promise<OkPacket> {        
        let variableCount: string = "?";
        for (let i = 0; i < COMMENT_ID.length - 1; i++) {
            variableCount = variableCount + ", ?"
        }
        const [rows] = await this.client.execute<OkPacket>(
            '' + `(${variableCount})`,
            [
                ...COMMENT_ID,
                DTO.alias
            ]
        );

        return rows;
    }
}
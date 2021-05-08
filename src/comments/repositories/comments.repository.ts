import { Injectable } from "@nestjs/common";
import { OkPacket, ResultSetHeader, RowDataPacket } from "mysql2";
import { DB_MySQL } from "src/config/mysql.conn.provider";
import { HelperRepository } from "src/helpers/helper.repository";
import { ChangeAliasDTO } from "../dto/change-alias.dto";
import { CreateCommentDTO } from "../dto/create-comment.dto";
import { EditCommentDTO } from "../dto/edit-comment.dto";

@Injectable()
export class CommentsRepository extends HelperRepository {
    constructor(private connection_mysql: DB_MySQL){ super(); }
    private readonly client = this.connection_mysql.conn;

    /**
     * 
     * @param COMMENT_ID 
     * @param DTO 
     * @returns 
     */
    async updateComment_content_ByCommentID(COMMENT_ID: number, DTO: EditCommentDTO): Promise<OkPacket> {
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

    /**
     * 
     * @param THREAD_ID 
     * @param DTO 
     * @returns 
     */
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

    /**
     * 
     * @param DTO 
     * @param COMMENT_IDs 
     * @returns 
     */
    async updateCommentAliasByCommentID(DTO: ChangeAliasDTO, USER_ID: number): Promise<OkPacket> {        
        const [rows] = await this.client.execute<OkPacket>(
            '',
            [
                USER_ID,
                DTO.alias
            ]
        );

        return rows;
    }
}
import { Injectable } from "@nestjs/common";
import { DBRes, DB_MySQL } from "src/config/mysql.conn";
import { CreateCommentDTO } from "../dto/create-comment.dto";
import { EditCommentDTO } from "../dto/edit-comment.dto";

@Injectable()
export class CommentsRepository {
    constructor(private connection_mysql: DB_MySQL){}
    private readonly client = this.connection_mysql.conn;

    async editComment(dto: EditCommentDTO): Promise<DBRes> {
        const [rows] = await this.client.execute('');

        return rows
    }

    async addCommentToExistingThread(dto: CreateCommentDTO): Promise<DBRes> {
        const [rows] = await this.client.execute('');

        return rows
    }
}
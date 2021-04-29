import { Injectable } from "@nestjs/common";
import { DBRes, DB_MySQL } from "src/config/mysql.conn";

@Injectable()
export class UsersRepository {
    constructor(private connection_mysql: DB_MySQL){}
    private readonly client = this.connection_mysql.conn;

    async SelectUserByID_and_ChildCommentsByUserIDByIDByTenDesc(USER_ID: number, LEFT_OFF: number): Promise<DBRes> {
        const [rows] = await this.client.execute(
            'SELECT user_id, name, comment_id, content, timestamp, thread_id ' +
            'FROM users ' +
            'INNER JOIN comments ON poster_id = name AND user_id = ? ' +
            'AND comment_id > ? LIMIT 11 ' +
            'ORDER BY comment_id DESC',
            [USER_ID, LEFT_OFF]
        )
        
        return rows;
    }
}
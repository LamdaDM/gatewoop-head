import { Injectable } from "@nestjs/common";
import { OkPacket, RowDataPacket } from "mysql2";
import { MySQLConnProvider } from "src/common/mysql/mysql.provider";
import { HelperRepository } from "src/helpers/helper.repository";
import { ChangeFollowerDTO } from "../dto/change-follower.dto";
import { CreateUserDTO } from "../dto/create-user.dto";
import { UpdateOriginHiddenDTO } from "../dto/update-origin-hidden.dto";
import { UpdatePasswordDTO } from "../dto/update-password.dto";
import { UpdateDisplayNameDTO } from "../dto/update_display_name.dto";

/**
 * Repository: Handles the logic of reading and writing data on disk.
 */
@Injectable()
export class UsersRepository extends HelperRepository{
    constructor(private readonly connection_mysql: MySQLConnProvider){ super(); }
    private readonly client = this.connection_mysql.conn;

    /**
     * Reads 11 comments from a single user's history of comments.
     * @param USER_ID 
     * @param LEFT_OFF 
     * @returns One row of key-value pairs: `user_id`, `iden_name`, `display_name`, `comment_id`, `content`, `timestamp`, `thread_id`
     */
    async selectUserByID_and_ChildCommentsByUserIDByIDByTenDesc(USER_ID: number, LEFT_OFF: number): Promise<RowDataPacket[]> {
        const [rows] = await this.client.execute<RowDataPacket[]>(
            'SELECT user_id, iden_name, display_name, comment_id, content, timestamp, thread_id ' +
            'FROM users ' +
            'INNER JOIN comments ON poster_id = name AND user_id = ? ' +
            'AND comment_id > ? LIMIT 11 ' +
            'ORDER BY comment_id DESC',
            [USER_ID, LEFT_OFF]
        )
        
        return rows;
    }

    /**
     * Reads all attributes of a user except their password.
     * @param IDEN_NAME 
     * @returns One row of key-value pairs: `user_id`, `iden_name`, `display_name`, `origin_hidden`, `date_user_created` 
     */
    async selectUserByNameFull(IDEN_NAME: string): Promise<RowDataPacket[]> {
        const [rows] = await this.client.execute<RowDataPacket[]>(
            'SELECT user_id, iden_name, display_name, origin_hidden, date_user_created ' +
            'FROM users ' +
            'WHERE iden_name = ?;',
            [ IDEN_NAME ]
        )

        return rows;
    }

    /**
     * @param IDEN_NAME 
     * @returns One row of key-value pairs: `user_id`, `iden_name`, `password`
     */
    async selectUserCredentialsByName(IDEN_NAME: string): Promise<RowDataPacket[]> {
        const [rows] = await this.client.execute<RowDataPacket[]>(
            'SELECT user_id, iden_name, password ' +
            'FROM users ' +
            'WHERE iden_name = ?;',
            [IDEN_NAME]    
        )

        return rows;
    }

    /**
     * @param DTO 
     * @returns Information packet on inserted row
     */
    async insertUser(DTO: CreateUserDTO): Promise<OkPacket> {
        const [rows] = await this.client.execute<OkPacket>(
            'INSERT (iden_name, password, date_user_created) ' +
            'INTO users ' + 
            `VALUES ${await super.addDynamicParams(3)};`,
            [
                DTO.iden_name,
                DTO.password,
                DTO.date_user_created
            ]
        )

        return rows;
    }

    async updateUser_display_name_ByID(USER_ID: number, DTO: UpdateDisplayNameDTO): Promise<OkPacket> {
        const [rows] = await this.client.execute<OkPacket>(
            'UPDATE users ' +
            'SET display_name = ? ' +
            'WHERE user_id = ?;',
            [
                DTO.display_name,
                USER_ID
            ]
        )

        return rows;
    }

    /**
     * @param USER_ID 
     * @param DTO 
     * @returns Information package on updated row
     */
    async updateUser_origin_hidden_ByID(USER_ID: number, DTO: UpdateOriginHiddenDTO): Promise<OkPacket> {
        const [rows] = await this.client.execute<OkPacket>(
            'UPDATE users ' + 
            'SET origin_hidden = ? ' +
            'WHERE user_id = ?;',
            [
                DTO.origin_hidden,
                USER_ID
            ]
        )

        return rows;
    }
    
    /**
     * @param USER_ID 
     * @param DTO 
     * @returns Information package on updated row
     */
    async updateUser_password_ByID(USER_ID: number, DTO: UpdatePasswordDTO): Promise<OkPacket> {
        const [rows] = await this.client.execute<OkPacket>(
            'UPDATE users ' +
            'SET password = ? ' +
            'WHERE user_id = ?;',
            [
                DTO.password,
                USER_ID
            ]
        )
 
        return rows;
    }

    /**
     * 
     * @param USER_ID 
     * @returns Information package on deleted row
     */
    async deleteUserByID(USER_ID: number): Promise<OkPacket> {
        const [rows] = await this.client.execute<OkPacket>(
            'DELETE FROM users ' +
            'WHERE user_id = ?;',
            [USER_ID]
        )

        return rows;
    }

    /**
     * @param DTO 
     * @returns Information package on inserted row 
     */
    async insertFollowing(DTO: ChangeFollowerDTO): Promise<OkPacket> {
        const [rows] = await this.client.execute<OkPacket>(
            'INSERT (pub_id, sub_id) ' +
            'INTO followings ' +
            'VALUES (?, ?);',
            [
                DTO.pub_id,
                DTO.sub_id,
            ]
        )

        return rows;
    }

    /**
     * @param DTO 
     * @returns Information package on deleted row
     */
    async deleteFollowing(DTO: ChangeFollowerDTO): Promise<OkPacket> {
        const [rows] = await this.client.execute<OkPacket>(
            'DELETE FROM followings ' +
            'WHERE sub_id = ? AND pub_id = ?;',
            [
                DTO.sub_id, 
                DTO.pub_id
            ]
        )

        return rows;
    }

    /**
     * @param PUB_ID 
     * @returns Information package on deleted rows
     */
    async deleteAllFollowingsByPubID(PUB_ID: number): Promise<OkPacket> {
        const [rows] = await this.client.execute<OkPacket>(
            'DELETE FROM followings ' +
            'where pub_id = ?;',
            [ PUB_ID ]
        )

        return rows;
    }
}
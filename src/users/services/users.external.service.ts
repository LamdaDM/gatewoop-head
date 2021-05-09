import { Injectable } from "@nestjs/common";
import { OkPacket } from "mysql2";
import { UpdateDisplayNameDTO } from "../dto/update_display_name.dto";
import { User } from "../model/user.model";
import { UsersRepository } from "../repositories/users.repository";

@Injectable()
export class UsersExternalService{
    constructor(private readonly userRepository: UsersRepository) {}

    /**
     * @param identification 
     * @returns User object with: `user_id`, `iden_name`, 
     * `display_name`, `origin_hidden`, `date_user_created`.
     */
     async getFullUserProfileByName(usersName: string): Promise<User> {
        const res = await this.userRepository.selectUserByNameFull(usersName);

        // TODO: Proper error handling

        return {
            user_id: res['user_id'],
            iden_name: res['iden_name'],
            display_name: res['display_name'],
            origin_hidden: res['origin_hidden'],
            date_user_created: res['date_user_created']
        }
    }

    async getUsersByTenByIDAsc() {}

    async getUsersByTenByName() {}

    async createUser() {}

    async updateUserPassword() {}
    
    async changeDisplayName(usersId: number, dto: UpdateDisplayNameDTO): Promise<string> {
        const res: OkPacket = await this.userRepository.updateUser_display_name_ByID(usersId, dto);

        return res.message;
    }

    async deleteUser(usersId: number): Promise<string> {
        const res: OkPacket = await this.userRepository.deleteUserByID(usersId);

        return res.message;
    }
}
import { Injectable } from '@nestjs/common';
import { RowDataPacket } from 'mysql2';
import { User } from './model/user.model';
import { UsersRepository } from './repositories/users.repository';

@Injectable()
export class UsersService {
    constructor(private readonly userRepository: UsersRepository,){}
    
    /**
     * @param identification 
     * @returns User object with: `user_id`, `iden_name`, 
     * `display_name`, `origin_hidden`, `date_user_created`.
     */
    async getFullUserProfileByName(identification: string): Promise<User> {
        const res = await this.userRepository.selectUserByNameFull(identification);

        // TODO: Proper error handling

        return {
            user_id: res['user_id'],
            iden_name: res['iden_name'],
            display_name: res['display_name'],
            origin_hidden: res['origin_hidden'],
            date_user_created: res['date_user_created']
        }
    }

    async getUserProfileByNameMinimal(identification: string): Promise<User> {
        const res: RowDataPacket[] = await this.userRepository.selectUserCredentialsByName(identification);
        
        if(!res) { throw new Error(`No user found with the name '${identification}'.`); }
        
        return {
            user_id: res['user_id'],
            iden_name: res['iden_name'],
            password: res['password']
        };
    }

    async getUsersByTenByIDAsc() {}

    async getUsersByTenByName() {}

    async createUser() {}

    async updateUserPassword() {}
    
    async updateUserName() {}

    async deleteUser() {}
}

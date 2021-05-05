import { Injectable } from '@nestjs/common';
import { User } from './model/user.model';
import { UsersRepository } from './repositories/users.repository';

@Injectable()
export class UsersService {
    constructor(
        private userRepository: UsersRepository,
    ){}
    

    async getUserByID() {}

    async getPasswordByX(stdin: string): Promise<User> {
        return { user_id: 1, password: 'pw' }
    }

    async getUsersByTenByIDAsc() {}

    async getUsersByTenByName() {}

    async createUser() {}

    async updateUserPassword() {}
    
    async updateUserName() {}

    async deleteUser() {}
}

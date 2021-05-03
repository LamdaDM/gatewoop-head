import { Injectable } from '@nestjs/common';
import { CommentsRepository } from 'src/comments/repositories/comments.repository';
import { UsersRepository } from './repositories/users.repository';

export type User = {
    user_id?: string,
    user_name?: string,
    origin_hidden?: boolean,
    password?: string,
}

@Injectable()
export class UsersService {
    constructor(
        private userRepository: UsersRepository,
    ){}
    

    async getUserByID() {}

    async getPasswordByX(stdin: string): Promise<User> {
        return { user_id: 'name', password: 'pw' }
    }

    async getUsersByTenByIDAsc() {}

    async getUsersByTenByName() {}

    async createUser() {}

    async updateUserPassword() {}
    
    async updateUserName() {}

    async deleteUser() {}
}

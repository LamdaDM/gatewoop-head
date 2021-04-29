import { Injectable } from '@nestjs/common';
import { CommentsRepository } from 'src/comments/repositories/comments.repository';
import { UsersRepository } from './repositories/users.repository';

@Injectable()
export class UsersService {
    constructor(
        private userRepository: UsersRepository,
        private commentsRepository: CommentsRepository,
    ){}
    

    async getUserByID() {}

    async getUsersByTenByIDAsc() {}

    async getUsersByTenByName() {}

    async createUser() {}

    async updateUserPassword() {}
    
    async updateUserName() {}

    async deleteUser() {}
}

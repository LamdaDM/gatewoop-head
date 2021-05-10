import { Injectable } from '@nestjs/common';
import { RowDataPacket } from 'mysql2';
import { User } from '../model/user.model';
import { UsersRepository } from '../repositories/users.repository';

@Injectable()
export class UsersInternalService {
    constructor(private readonly userRepository: UsersRepository){}
    
    async getUserProfileByNameMinimal(identification: string): Promise<User> {
        const res: RowDataPacket[] = await this.userRepository.selectUserCredentialsByName(identification);
        
        if(!res) { throw new Error(`Connection to database failed.`); }
        if(res.length === 0) { throw new Error(`Could not find user with name.`) }
        
        return {
            user_id: res['user_id'],
            iden_name: res['iden_name'],
            password: res['password']
        };
    }
}

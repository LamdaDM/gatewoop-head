import { Injectable } from '@nestjs/common';
import { RowDataPacket } from 'mysql2';
import { User } from '../model/user.model';
import { UsersRepository } from '../repositories/users.repository';

@Injectable()
export class UsersInternalService {
    constructor(private readonly userRepository: UsersRepository){}
    
    async getUserProfileByNameMinimal(identification: string): Promise<User> {
        const res: RowDataPacket[] = await this.userRepository.selectUserCredentialsByName(identification);
        
        if(!res) { throw new Error(`No user found with the name '${identification}'.`); }
        
        return {
            user_id: res['user_id'],
            iden_name: res['iden_name'],
            password: res['password']
        };
    }
}

import { Injectable } from '@nestjs/common';
import { RowDataPacket } from 'mysql2';
import { UsersRepository } from '../repositories/users.repository';


export type UserProfileFull = {
    user_id?: number,
    iden_name?: string,
    password?: string,
    friends?: number[],
    groups?: number[]
}

@Injectable()
export class UsersInternalService {
    constructor(private readonly userRepository: UsersRepository){}
    
    async getUserProfileByName(identification: string): Promise<UserProfileFull> {
        const res: RowDataPacket[][] = await this.userRepository.selectUserCredentialsByName(identification);
        
        if(!res) { throw new Error(`Connection to database failed.`); }
        if(res.length === 0 
            || res['user_id'] === null 
            || res['iden_name'] === null 
            || res['password'] === null
        ) { throw new Error(`Could not find user with name.`); }

        const groups = [];
        const friends = [];
        for(let row of res) {  
            if(row['groups'] !== null) { groups.push(row['group']); }
            if(row['friends'] !== null) { groups.push(row['friends']); }
        }

        return {
            user_id: res['user_id'],
            iden_name: res['iden_name'],
            password: res['password'],
            friends: friends,
            groups: groups,
        };
    }
}

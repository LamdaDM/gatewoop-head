import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { HashProvider } from "src/common/hash/hash.provider";

import { UsersInternalService } from "src/users/services/users.internal.service";

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersInternalService,
        private readonly hashService: HashProvider,
        private readonly jwtService: JwtService
    ){}

    async validate(identification: string, pwInput: string) { 
        const user = await this.usersService.getUserProfileByNameMinimal(identification);

        if(user && await this.hashService.validate(user.password, pwInput)){ 
            const {password, ...results} = user;
            return results;
        } return null;
    }

    async login(user: any){
        const payload = { user: user.username, sub: user.userID };
        return { access_token: this.jwtService.sign(payload) };
    }
}
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ARGON2_GLA2H_PROVIDER } from "src/config/hash.provider";
import { UsersService } from "src/users/users.service";

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly hashService: ARGON2_GLA2H_PROVIDER,
        private readonly jwtService: JwtService
    ){}

    async validate(identification: string, pwInput: string) { 
        const user = await this.usersService.getUserProfileByNameMinimal(identification);

        if(user && await this.hashService.validateAgainstHash(pwInput, user.password)){ 
            const {password, ...results} = user;
            return results;
        } return null;
    }

    async login(user: any){
        const payload = { user: user.username, sub: user.userID };
        return { access_token: this.jwtService.sign(payload) };
    }
}
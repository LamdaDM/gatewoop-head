import { Injectable } from "@nestjs/common";
import { FastifyRequest } from "fastify";
import { HashProvider } from "src/common/providers/hash/hash.provider";
import { UsersInternalService } from "src/users/services/users.internal.service";

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersInternalService,
        private readonly hashService: HashProvider,
    ){}

    async validate(identification: string, pwInput: string) { 
        const user = await this.usersService.getUserProfileByNameMinimal(identification);

        if(user && await this.hashService.validate(user.password, pwInput)){ 
            const {password, ...results} = user;
            return results;
        } return null;
    }

    /**
     * Sets session cookie with user credentials
     * @param request 
     */
    async login(request: FastifyRequest){
        const userID = request.session.get('userid')
    }
}
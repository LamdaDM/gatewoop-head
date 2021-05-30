import { FastifyRequest } from "fastify";
import { HashService } from "src/common/providers/hash/hash.service";
import { UserProfileFull, UsersInternalService } from "src/users/services/users.internal.service";

export class AuthService {
    constructor(
        private usersInternalService: UsersInternalService,
        private hashService: HashService,    
    ){}   

    async validateUser(iden_name: string, in_password: string): Promise<UserProfileFull> {
        const user = await this
            .usersInternalService
            .getUserProfileByName(iden_name);

        if(!this.hashService
            .validateAgainstHash(user.password, in_password)
        ) { return null; }
        const {password, ...userProfile} = user;

        return userProfile;
    }

    async firstSign(req: FastifyRequest, details: UserProfileFull) {
        let friends: string = "";
        for(let friend of details.friends) { friends += `${friend};`; }

        let groups = "";
        for(let group of details.groups) { groups += `${group};`; }
        
        req.session.regenerate();
        req.session.pass = true;
        req.session.token = false;
        req.session.user_id = details.user_id;
        req.session.iden_name = details.iden_name;
        req.session.friends = friends;
        req.session.groups = groups;
    }
}
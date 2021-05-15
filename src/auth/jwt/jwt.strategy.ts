import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport";
import { ExtractJwt } from "passport-jwt";
import { jwt_Secret } from "src/common/arguments/jwt.arguments";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt'){
    constructor() { 
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwt_Secret,
        })
    }

    async validate(payload: any){ 
        return { userID: payload.sub, username: payload.username };
    }
}
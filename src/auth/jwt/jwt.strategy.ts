import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { env } from "node:process";
import { Strategy } from "passport";
import { ExtractJwt } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor() { 
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: env.JWT_SECRET,
        })
    }

    async validate(payload: any){ 
        return { userID: payload.sub, username: payload.username };
    }
}
import { Injectable } from "@nestjs/common";
import { FastifyRequest } from "fastify";
import { Strategy } from "passport";

@Injectable()
export class SessionStrategy extends Strategy {
    constructor(){
        super();
        this.name = 'session';
    }

    async validate(request: FastifyRequest) {
        
    }
}
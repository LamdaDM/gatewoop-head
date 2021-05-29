import { CanActivate, ExecutionContext } from "@nestjs/common";
import { FastifyRequest } from "fastify";
import { Observable } from "rxjs";

export class SessionSetGuard implements CanActivate {
    
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const session = context.switchToHttp().getRequest<FastifyRequest>().session;
        
        if(!session.pass || !session.token) { return false; }
        session.touch();
        session.token = false;
        return true;
    }
    
}
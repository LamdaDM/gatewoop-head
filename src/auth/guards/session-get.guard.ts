import { CanActivate, ExecutionContext } from "@nestjs/common";
import { FastifyRequest } from "fastify";
import { Observable } from "rxjs";

export class SessionGetGuard implements CanActivate{

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest<FastifyRequest>();

        if(!req.session.pass){ return false; }
        req.session.touch();
        req.session.token = true;
        return true;
    }

}
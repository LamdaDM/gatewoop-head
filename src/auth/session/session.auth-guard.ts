import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { FastifyRequest } from "fastify";
import { AuthService } from "../auth.service";

@Injectable()
export class SessionGuard implements CanActivate {
    constructor(private authService: AuthService){};

    private validateSession(request: FastifyRequest): boolean {
        
    }

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest<FastifyRequest>()
        
        return this.validateSession(request)
    }
}
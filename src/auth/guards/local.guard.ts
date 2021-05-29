import { CanActivate, ExecutionContext } from "@nestjs/common";
import { FastifyRequest } from "fastify";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";

type LocalGuardReq = FastifyRequest<{
    Body: {
        iden_name: string,
        password: string,
    }
}>

export class LocalGuard implements CanActivate{
    constructor(private authService: AuthService){}

    async validate(req: LocalGuardReq): Promise<boolean> {
        const body = req.body;
        if( body.iden_name === null || body.password === null){ return false; }
        
        let cred = await this.authService.validateUser(body.iden_name, body.password);
        if(cred) {
            this.authService.firstSign(req, cred);
            return true;
        }
        return false;
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        return this.validate(context.switchToHttp().getRequest<LocalGuardReq>());
    }

}
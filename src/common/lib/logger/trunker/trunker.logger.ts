import { Injectable, LoggerService } from "@nestjs/common";
import { trunker_Args } from "../../../secret-args/arguments.priv";
import { TCPClientService } from "../../../providers/tcp/tcp-client.service";

@Injectable()
export class TrunkerLogger implements LoggerService {
    constructor(private tcpClientService: TCPClientService){}
    private trunkerConn = this.tcpClientService
        .connect(trunker_Args.host, trunker_Args.port);
    
    private fmtConsole(msg: any, tr?: string, ctx?: string): string {
        return`log: ${msg}\n` +
            `ctx: ${ ctx ?? "None" }\n` +
            `tr: ${ tr ?? "None" };`
    }

    private fmtTrunker(lvl: string, msg: any, ctx?: string, trace?: string): string {
        return `${lvl}gatewoop-head|log: ${msg} &&& ` + 
            `tr: ${ctx ?? "None"} &&& ` +
            `ctx: ${trace ?? "None"}\n`;
    }

    log(message: any, context?: string) {
        console.log(this.fmtConsole(message, context));
    }

    async error(message: any, trace?: string, context?: string) {
        let msg = this.fmtTrunker("*", message, context, trace);
        let fl = await this.tcpClientService.call(msg, this.trunkerConn);
        
        if (!fl) { console.error("Trunker TCP service failed."); };
        
        console.error(msg);
    }
    
    async warn(message: any, context?: string) {
        let msg = this.fmtTrunker("$", message, context);
        let fl = await this.tcpClientService.call(msg, this.trunkerConn);
        
        if (!fl) { console.error("Trunker TCP service failed."); };
        
        console.error(msg);
    }

    debug?(message: any, context?: string) {
        console.log(this.fmtConsole(message, context));
    }

    verbose?(message: any, context?: string) {
        console.log(this.fmtConsole(message, context));
    }

    async test(): Promise<string> {
        let msg = this.fmtTrunker('!', "Testing");
        return await this.tcpClientService
            .call(msg, this.trunkerConn)
                .then((val) => { return val.toString(); })
                .catch((err) => { 
                    console.error(err); 
                    return null;
                });
    }
}
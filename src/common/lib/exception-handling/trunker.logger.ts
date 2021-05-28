import { LoggerService } from "@nestjs/common";
import { TCPClientService } from "../tcp/tcp-client.service";
import { trunker_Args } from "./trunker.arguments";

export class TrunkerLogger implements LoggerService {
    constructor(private tcpClientService: TCPClientService){}
    private trunkerConn = this.tcpClientService
        .connect(trunker_Args.host, trunker_Args.port);
    
    private fmtConsole(msg: any, tr?: string, ctx?: string): string {
        return`log: ${msg}\n` +
            `ctx: ${ ctx ?? "None" }\n` +
            `tr: ${ tr ?? "None" };`
    }

    private fmtTrunker(lvl: string, msg: any, tr?: string, ctx?: string): string {
        return `${lvl}gatewoop-head|log: ${msg} &&& ` + 
            `tr: ${tr ?? "None"} &&& ` +
            `ctx: ${ctx ?? "None"}\n`;
    }

    log(message: any, context?: string) {
        console.log(this.fmtConsole(message, null, context));
    }

    error(message: any, trace?: string, context?: string) {
        let msg = this.fmtTrunker("*", message, trace, context);
        let fl = this.tcpClientService.call(msg, this.trunkerConn);
        
        if (!fl) { console.error("Trunker TCP service failed."); };
        
        console.error(msg);
    }
    
    warn(message: any, context?: string) {
        let msg = this.fmtTrunker("!", message, null, context);
        let fl = this.tcpClientService.call(msg, this.trunkerConn);
        
        if (!fl) { console.error("Trunker TCP service failed."); };
        
        console.error(msg);
    }

    debug?(message: any, context?: string) {
        console.log(this.fmtConsole(message, null, context));
    }
    verbose?(message: any, context?: string) {
        console.log(this.fmtConsole(message, null, context));
    }

}
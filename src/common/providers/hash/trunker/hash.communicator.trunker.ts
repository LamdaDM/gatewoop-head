import { trunker_Args } from "src/common/secret-args/arguments.priv";
import { TCPClientService } from "../../tcp/tcp-client.service";
import { HashCommunicatorService } from "../hash.communicator.interface";

export class HashTrunkerCommunicator implements HashCommunicatorService {
    constructor(private tcpClientService: TCPClientService){}
    private readonly trunkerConn = this.tcpClientService
        .connect(trunker_Args.host, trunker_Args.port)

    fmtHash(norm: string): string { return `%${norm}`; }

    async callHash(norm: string): Promise<string> {
        return new Promise((resolve, reject) => { 
            this.tcpClientService
            .call(this.fmtHash(norm), this.trunkerConn)
                .then((data) => { resolve(data.toString()); })
                .catch((err) => { reject(err); });
        });
    }
}
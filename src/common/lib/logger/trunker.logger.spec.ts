import { Test, TestingModule } from "@nestjs/testing"
import { TCPClientService } from "../tcp/tcp-client.service"
import { TrunkerLogger } from "./trunker.logger";

describe('logging to trunker', () => {
    let trunkerLogger: TrunkerLogger;

    beforeAll(async () => {
        const mod = await Test.createTestingModule({
            providers: [TCPClientService]
        }).compile();

        const tcpClientService = mod.get(TCPClientService);

        trunkerLogger = new TrunkerLogger(tcpClientService);
    })

    it('test should return a message', async () => {
        let res = await trunkerLogger.test();
        expect(res).toBeDefined();
    })
})
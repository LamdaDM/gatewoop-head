import { ConfigModule } from "@nestjs/config"
import { Test, TestingModule } from "@nestjs/testing"
import { OkPacket, Pool } from "mysql2/promise"
import { CommonProvidersModule } from "../../common.providers.module"
import { MySQLConnectionService } from "./mysql.service"

describe('mysql connection', () => {
    let testingClient: Pool;
    
    let stderr: any;
    let stdout: any;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [CommonProvidersModule, ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env'})]
        }).compile()

        const mConn = module.get(MySQLConnectionService);
        testingClient = mConn.conn;
        await testingClient.execute(
            'FALSE RUN', 
            ['DUMMY']
        ).then(res => {
            stdout = res;
        }).catch(den => {
            stderr = den;
        })
    })

    it('should be defined', () => {
        expect(testingClient).toBeDefined()
    })

    it('should throw error when calling execute()', () => {
        expect(stdout).toBeUndefined();
        expect(stderr).toBeDefined();
    })
})
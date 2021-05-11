import { ConfigModule } from "@nestjs/config"
import { Test, TestingModule } from "@nestjs/testing"
import { OkPacket, Pool } from "mysql2/promise"
import { CommonProvidersModule } from "../common.providers.module"
import { DB_MySQL } from "../mysql.conn.provider"

describe('mysql connection', () => {
    let testingClient: Pool;
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [CommonProvidersModule, ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env'})]
        }).compile()

        testingClient = new DB_MySQL().conn;
    })

    it('should be defined', () => {
        expect(testingClient).toBeDefined()
    })

    it('should throw error when calling execute()', () => {
        expect(async () => {
            await testingClient.execute<OkPacket>('FALSE RUN', ['DUMMY'])
                .then((val) => {
                    console.log(val[0])
                })
                .catch((err) => {throw err;})
        }).toThrow();
    })
})
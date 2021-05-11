import { ConfigModule } from "@nestjs/config"
import { Test, TestingModule } from "@nestjs/testing"
import { createPool } from "mysql2/promise"
import { CommonProvidersModule } from "../common.providers.module"
import { DB_MySQL } from "../mysql.conn.provider"
import { mysql2Options } from "../options/mysql2.options"

describe('mysql connection', () => {
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [CommonProvidersModule, ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env'})]
        }).compile()

        const testingClient = new DB_MySQL().conn;
    })
})
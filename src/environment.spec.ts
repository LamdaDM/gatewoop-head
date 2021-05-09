import { ConfigModule } from "@nestjs/config"
import { Test, TestingModule } from "@nestjs/testing"
import { env } from "process";

describe('environment', () => {
    let trStringEnvVar: string;
    let trIntEnvVar: number;
    let trBoolEnvVar: boolean;
    let trArrEnvVar: any[];

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env.test'
            })]
        }).compile()

        trStringEnvVar = env.TEST_S;
        trIntEnvVar = Number(JSON.parse(env.TEST_I))
        trBoolEnvVar = Boolean(JSON.parse(env.TEST_B));
        trArrEnvVar = JSON.parse(env.TEST_A);
    })

    it('should equal', () => {
        expect(trStringEnvVar).toEqual("j99DZJJZZ....testSUccE#Ede@@D");
        expect(trIntEnvVar).toEqual(191.91);
        expect(trBoolEnvVar).toEqual(true);
        expect(trArrEnvVar).toEqual([1, 4, 5]);
    })
})
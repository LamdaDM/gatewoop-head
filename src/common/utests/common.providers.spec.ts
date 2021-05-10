import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { CommonProvidersModule } from "../common.providers.module";
import { ARGON2_GLA2H_PROVIDER } from "../hash.provider";

describe('common providers', () => {
    let output: Map<string, string>;
    let gla2h_client: ARGON2_GLA2H_PROVIDER;
    let stdout_gla2h: string;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [ 
                CommonProvidersModule, 
                ConfigModule.forRoot({
                    envFilePath: ['gla2h.params.env']
                }) 
            ]
        }).compile()

        gla2h_client = new ARGON2_GLA2H_PROVIDER();
        output = await gla2h_client.GLA2H_exec(`test input...`);
        stdout_gla2h = output.get('stdout')
        console.log(output)
    })

    it('output from gla2h_exec should be', () => {
        expect(stdout_gla2h.substring(0, 8)).toBe('$argon2i')
    })
})
import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { env } from "process";
import { ARGON2_GLA2H_PROVIDER } from "../hash.provider";
import { gla2hArgs } from "../options/gla2h.options";
import { OptionsGLA2H } from "../options/gla2h.options.interface";

describe('gla2h provider', () => {
    let gla2h_client: ARGON2_GLA2H_PROVIDER;
    
    let output_gla2h_raw: Map<string, string>;
    let stdout_gla2h_raw: string;

    let hash_gla2h_helper: string;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [ConfigModule.forRoot({
                    isGlobal: true,
                    envFilePath: ['.env.gla2h.params']
                })],
            providers: [ARGON2_GLA2H_PROVIDER]
        }).compile()

        const gla2hArgs: OptionsGLA2H = {
            path: env.GLA2H_PATH,
            timed: env.GLA2H_TIMED,
            benchmark: env.GLA2H_BENCHMARK,
            memcost: parseInt(env.GLA2H_MEMCOST),
            passes: parseInt(env.GLA2H_PASSES),
            threads: parseInt(env.GLA2H_THREADS)
        }

        gla2h_client = module.get(ARGON2_GLA2H_PROVIDER);
        output_gla2h_raw = await gla2h_client.GLA2H_exec('break!', gla2hArgs);
        stdout_gla2h_raw = output_gla2h_raw.get('stdout');
        console.log(output_gla2h_raw);

        hash_gla2h_helper = await gla2h_client.passwordHash('helper test', gla2hArgs, 2);
        console.log(hash_gla2h_helper);
    })

    it('output from gla2h_exec should be', () => {
        expect(stdout_gla2h_raw.substring(0, 8)).toBe('$argon2i');
    })

    it('output from passwordHash should be', () => {
        expect(hash_gla2h_helper.substr(0, 8)).toBe('$argon2i')
    })
})
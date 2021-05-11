import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { env } from "process";
import { ARGON2_GLA2H_PROVIDER } from "../hash.provider";
import { gla2h_Args } from "../arguments/gla2h.arguments";
import { OptionsGLA2H } from "../arguments/interfaces/gla2h.arguments.interface";

describe('gla2h provider', () => {
    let gla2h_client: ARGON2_GLA2H_PROVIDER;
    
    let stdout_gla2h_raw: string;

    let hash_gla2h_helper: string;

    let testing_gla2h_options;
    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [ConfigModule.forRoot({
                    isGlobal: true,
                    envFilePath: ['gla2h.params.env']
                })],
            providers: [ARGON2_GLA2H_PROVIDER]
        }).compile()

        testing_gla2h_options = gla2h_Args;

        const gla2h_options: OptionsGLA2H = {
            path: env.GLA2H_PATH,
            timed: env.GLA2H_TIMED,
            benchmark: env.GLA2H_BENCHMARK,
            memcost: parseInt(env.GLA2H_MEMCOST),
            passes: parseInt(env.GLA2H_PASSES),
            threads: parseInt(env.GLA2H_THREADS)
        }

        gla2h_client = module.get(ARGON2_GLA2H_PROVIDER);
        
        await gla2h_client.GLA2H_exec('break!', testing_gla2h_options)
            .then((res) => {
                console.log(res.get('stdout'));
                stdout_gla2h_raw = res.get('stdout')
            })
            .catch((err) => { throw err; });

        await gla2h_client.passwordHash('what the fuck', gla2h_options)
            .then((res) => {
                console.log(res)
                hash_gla2h_helper = res; 
            })
            .catch((err) => { throw err; });
    })

    it('output from gla2h_exec should be', () => {
        expect(stdout_gla2h_raw.substring(0, 8)).toBe('$argon2i');
    })

    it('output from passwordHash should be', () => {
        expect(hash_gla2h_helper.substring(0, 8)).toBe('$argon2i');
    })

    it('memcost of gla2hArgs constant', () => {
        expect(testing_gla2h_options.benchmark).toBe('x')
    })
})
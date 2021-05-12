import { Test, TestingModule } from "@nestjs/testing";
import { ARGON2_GLA2H_PROVIDER, gla2h_Response } from "../hash.provider";
import { gla2h_Args } from "../arguments/gla2h.arguments";
import { OptionsGLA2H } from "../arguments/interfaces/gla2h.arguments.interface";
import * as argon2 from "argon2"

describe('gla2h provider', () => {
    let gla2h_client: ARGON2_GLA2H_PROVIDER;

    const testOpt: OptionsGLA2H = gla2h_Args

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ARGON2_GLA2H_PROVIDER]
        }).compile()

        gla2h_client = module.get(ARGON2_GLA2H_PROVIDER);
    })

    it('gla2h_Args should be defined', () => {
        expect(testOpt).toBeDefined();
    })

    it('GLA2H provider should be injected', () => {
        expect(gla2h_client).toBeDefined();
    })

    it('GLA2H_exec should return hash', async () => {
        const test_res_suc = await gla2h_client.GLA2H_exec('go!...', testOpt);
        expect(test_res_suc.stdout).toBeDefined();
        expect(test_res_suc.stdout.substring(0, 8)).toBe('$argon2i');
    })

    it('GLA2H_exec, where stdin has extra spaces and quotation marks, should break', async () => {
        let break_res: gla2h_Response;
        let break_err: Error;
        await gla2h_client.GLA2H_exec(`' 'break!...' '`, testOpt)
            .then(res => { break_res = res; } )
            .catch(den => { break_err = den; });
        expect(break_res).toBeUndefined();
        expect(break_err).toBeDefined();
    })

    it('passwordHash should return hash', async () => {
        let pwH_hash: string;
        let pwH_err: Error;

        await gla2h_client.passwordHash('go!!!', testOpt)
            .then(res => { pwH_hash = res; })
            .catch(den => { pwH_err = den; });
        
        expect(pwH_err).toBeUndefined();
        expect(pwH_hash.substring(0, 8)).toBe('$argon2i');
    })

    it('validateAgainstHash should successfully match a password and its hashed form', async() => {
        const password = 'secret';
        const hashedPassword = await gla2h_client.passwordHash(password, testOpt);

        const validation: boolean = await gla2h_client.validateAgainstHash(hashedPassword, password);

        expect(validation).toBe<boolean>(true);
    })
})
import { Test, TestingModule } from "@nestjs/testing";
import { servegla2hOptions } from "./tcp-servegla2h/tcp-servegla2h.arguments.interface";
import { HashProvider } from "./hash.provider";
import { servegla2h_Args } from "./tcp-servegla2h/tcp-servegla2h.arguments";

describe('gla2h provider', () => {
    let hashClient: HashProvider;

    const testOpt: servegla2hOptions = servegla2h_Args

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [HashProvider]
        }).compile()

        hashClient = module.get(HashProvider);
    })

    it('testing options should be defined', () => {
        expect(testOpt).toBeDefined();
    })

    it('hash should return an argon2i hash', async () => {
        const hash = await (hashClient.hash("password!!:)"));

        expect(hash.substr(0, 8)).toBe('$argon2i');
    })

    it("validate should match a password and its hashed form", async() => {
        const password = "testinGG!!.czzz12300c"
        const hash = await hashClient.hash(password);
        console.log(hash)
        const validate = await hashClient.validate(hash, password);

        expect(validate).toBe<boolean>(true)
    })
})
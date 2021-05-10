import { OkPacket } from "mysql2"
import { TestingHelperRepository } from "./test.helper.repository";
import { TestingHelperService } from "./test.helper.service";

describe('helpers', () => {
    let packet: OkPacket;
    let paramTest: string;
    let testingHelperService: TestingHelperService;
    let testingHelperRepository: TestingHelperRepository;

    beforeEach(async () => {
        packet = null;

        testingHelperService = new TestingHelperService();
        testingHelperRepository = new TestingHelperRepository();

        paramTest = await testingHelperRepository.addDynamicParams(5)
    })

    it('should throw error', () => {
        expect(() => {
            testingHelperService.checkDBResponse(packet);
        }).toThrow
    })

    it('should be', () => {
        expect(paramTest).toBe('?, ?, ?, ?, ?')
    })
})
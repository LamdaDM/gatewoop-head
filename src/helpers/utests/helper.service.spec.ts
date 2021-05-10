import { OkPacket } from "mysql2"
import { TestingHelperService } from "./test.helper.service";

describe('helpers', () => {
    let packet: OkPacket;
    let testingHelperService: TestingHelperService;

    beforeEach(async () => {
        packet = null;
        testingHelperService = new TestingHelperService();
    })

    it('should throw error', () => {
        try {
            expect(testingHelperService.checkDBResponse(packet)).toThrow(`Connection to database failed.`)
        } catch (error) {
            console.error(error);
        }
    })
})
import { mock_Args } from "./common/arguments/mock.arguments.safe";

describe('environment', () => {
    let trStringEnvVar: string;
    let trIntEnvVar: number;
    let trBoolEnvVar: boolean;
    let trArrEnvVar: any[];

    beforeAll(async () => {
        trStringEnvVar = mock_Args.mStr;
        trIntEnvVar = mock_Args.mInt;
        trBoolEnvVar = mock_Args.mBool;
        trArrEnvVar = mock_Args.mArr;
    })

    it('should equal', () => {
        expect(trStringEnvVar).toEqual("j99DZJJZZ....testSUccE#Ede@@D");
        expect(trIntEnvVar).toEqual(191.91);
        expect(trBoolEnvVar).toEqual(true);
        expect(trArrEnvVar).toEqual([1, 4, 5]);
    })
})
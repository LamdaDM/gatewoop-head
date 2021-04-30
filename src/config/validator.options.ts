import { ValidatorOptions } from "@nestjs/common/interfaces/external/validator-options.interface";

export class ValOpt implements ValidatorOptions {
    /**
     * Implement options
     * Important one is `forbidUnknownValues: true`
     * Injectable maybe?
     */
}
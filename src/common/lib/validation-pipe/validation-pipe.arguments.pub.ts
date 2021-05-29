import { ValidationPipeOptions } from "@nestjs/common";

export const validationPipe_Args: ValidationPipeOptions = {
    disableErrorMessages: false, 
    forbidUnknownValues: true,
}
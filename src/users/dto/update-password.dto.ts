import { PickType } from "@nestjs/mapped-types";
import { CreateUserDTO } from "./create-user.dto";

export class UpdatePasswordDTO extends PickType(CreateUserDTO, ['password'] as const){}
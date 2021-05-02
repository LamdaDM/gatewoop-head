import { IsDate, IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class CreateUserDTO {
    @MinLength(4)
    @MaxLength(32)
    @IsNotEmpty()
    name: string;

    @MinLength(8)
    @MaxLength(32)
    @IsNotEmpty()
    password: string;

    @IsDate()
    @IsNotEmpty()
    date_user_created: string;
}
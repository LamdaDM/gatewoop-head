import { IsDate, IsNotEmpty, MaxLength, MinLength } from "class-validator";
import { User } from "../model/user.model";

export class CreateUserDTO implements User{
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
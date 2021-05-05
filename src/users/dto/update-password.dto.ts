import { IsNotEmpty, MaxLength, MinLength } from "class-validator";
import { User } from "../model/user.model";

export class UpdatePasswordDTO implements User{
    @MinLength(8)
    @MaxLength(60)
    @IsNotEmpty()
    password: string;
}
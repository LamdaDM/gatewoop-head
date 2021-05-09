import { IsNotEmpty, MaxLength, MinLength } from "class-validator";
import { User } from "../model/user.model";

export class UpdateDisplayNameDTO implements User {
    @MinLength(4)
    @MaxLength(60)
    @IsNotEmpty()
    display_name: string;
}
import { IsDate, IsNotEmpty, MaxLength, MinLength } from "class-validator";
import { Group } from "../model/group.model";

export class CreateGroupDTO implements Group {
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(60)
    group_name: string;

    @IsNotEmpty()
    @IsDate()
    date_group_created: string;
}
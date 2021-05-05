import { IsNotEmpty } from "class-validator";
import { Family } from "../model/family.model";

export class JoinGroupDTO implements Family {
    @IsNotEmpty()
    family_id: number;

    @IsNotEmpty()
    member_id: number;
}
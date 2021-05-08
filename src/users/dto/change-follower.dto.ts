import { IsNotEmpty } from "class-validator";
import { Following } from "../model/following.model";

export class ChangeFollowerDTO implements Following {
    @IsNotEmpty()
    sub_id: number;

    @IsNotEmpty()
    pub_id: number;
}
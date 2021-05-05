import { IsNotEmpty } from "class-validator";
import { Following } from "./following.model";

export class AddFollowerDTO implements Following {
    @IsNotEmpty()
    sub_id: number;

    @IsNotEmpty()
    pub_id: number;
}
import { IsBoolean } from "class-validator";
import { User } from "../model/user.model";

export class UpdateOriginHiddenDTO implements User {
     @IsBoolean()
     origin_hidden: boolean;
}
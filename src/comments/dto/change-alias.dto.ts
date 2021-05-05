import { MinLength, MaxLength, IsNotEmpty } from "class-validator";
import { Comment } from "../model/comment.model";

export class ChangeAliasDTO implements Comment {
    @MinLength(0)
    @MaxLength(45)
    alias: string;
}
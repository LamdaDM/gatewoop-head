import { MaxLength } from "class-validator";
import { Comment } from "../model/comment.model";

export class ChangeAliasDTO implements Comment {
    @MaxLength(45)
    alias: string;
}
import { IsNotEmpty, MaxLength, MinLength } from "class-validator";
import { Comment } from "../model/comment.model";

export class EditCommentDTO implements Comment {
     @IsNotEmpty()
     @MinLength(1)
     @MaxLength(128)
     title: string;
 
     @MinLength(1)
     @MaxLength(25600)
     content: string;
}
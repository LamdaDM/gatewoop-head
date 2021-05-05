import { PickType } from "@nestjs/mapped-types";
import { IsBoolean, IsNotEmpty, MaxLength, MinLength } from "class-validator";
import { Comment } from "../model/comment.model";
import { CreateCommentDTO } from "./create-comment.dto";

export class EditCommentDTO implements Comment {
     @MinLength(0)
     @MaxLength(45)
     alias: string;
 
     @IsBoolean()
     origin_hidden: boolean;
 
     @IsNotEmpty()
     @MinLength(1)
     @MaxLength(128)
     title: string;
 
     @MinLength(1)
     @MaxLength(25600)
     content: string;
}
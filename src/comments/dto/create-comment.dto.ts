import { IsBoolean, IsInt, IsISO8601, IsNotEmpty, MaxLength, MinLength } from 'class-validator'
import { Comment } from '../model/comment.model';

/**
 * @field poster_id Int
 * @field parent_thread_id Int
 * @field parent_comment_id Int
 * @field alias String
 * @field origin_hidden Boolean
 * @field comment_title String
 * @field content String
 * @field timestamp DateTime(ISO-8601)
 */
export class CreateCommentDTO implements Comment{
    @IsNotEmpty()
    @IsInt()
    poster_id: number;

    @IsInt()
    parent_thread_id: number;

    @IsInt()
    parent_comment_id: number;

    @MinLength(0)
    @MaxLength(45)
    alias: string;

    @IsBoolean()
    origin_hidden: boolean;

    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(128)
    comment_title: string;

    @MinLength(1)
    @MaxLength(25600)
    content: string;

    @IsNotEmpty()
    @IsISO8601()
    timestamp: string;
}
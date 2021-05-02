import { IsBoolean, IsInt, IsISO8601, IsNotEmpty, MaxLength, MinLength } from 'class-validator'

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
export class CreateCommentDTO {
    /**
     * fk ON user_id;
     * identifies the user that posted the comment.
     * NON-NULLABLE
     */
    @IsNotEmpty()
    @IsInt()
    poster_id: number;

    /**
     * fk ON thread_id;
     * for comments that are children of a thread's origin.
     * OPTIONAL
     */
    @IsInt()
    parent_thread_id: number;

    /**
     * fk ON comment_id;
     * for comments that are responding to another comment.
     * OPTIONAL
     */
    @IsInt()
    parent_comment_id: number;

    /**
     * Temporary alias to identify a poster with a comment.
     * Contextual to the thread it belongs to.
     * If length is zero, client displays the user's real name or '...'
     * Length: 0 - 45
     * OPTIONAL
     */
    @MinLength(0)
    @MaxLength(45)
    alias: string;

    /**
     * Flag for the client to display the poster's real name or not.
     * If true, when alias is an empty string, displays "..." as their name 
     * OPTIONAL;DEFAULT=false
     */
    @IsBoolean()
    origin_hidden: boolean;

    /**
     * Title for the given comment, one per comment.
     * Length: 1 - 128
     * NON-NULLABLE
     */
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(128)
    comment_title: string;

    /**
     * Body of a given comment, one per comment.
     * Length: 1 - 25,600
     * OPTIONAL
     */
    @MinLength(1)
    @MaxLength(25600)
    content: string;

    /**
     * Record of the time a given comment was created, one per comment
     * NON-NULLABLE
     */
    @IsNotEmpty()
    @IsISO8601()
    timestamp: string;
}
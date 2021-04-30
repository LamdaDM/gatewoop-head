import { PickType } from "@nestjs/mapped-types";
import { IsBoolean, IsNotEmpty, MaxLength, MinLength } from "class-validator";
import { CreateCommentDTO } from "./create-comment.dto";

export class EditCommentDTO {
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
     title: string;
 
     /**
      * Body of a given comment, one per comment.
      * Length: 1 - 25,600
      * OPTIONAL
      */
     @MinLength(1)
     @MaxLength(25600)
     content: string;
}
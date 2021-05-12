/**
 * @field comment_id
 * @field poster_id Int
 * @field parent_thread_id Int
 * @field parent_comment_id Int
 * @field alias String
 * @field comment_title String
 * @field content String
 * @field timestamp DateTime(ISO-8601)
 */
export interface Comment {
    /** 
     * PK AI unique identification number.
     */
    comment_id?: number;
    
    /**
     * FK ON user_id.
     * Identifies the user that posted the comment.
     * NON-NULLABLE
     */
     poster_id?: number;
 
     /**
      * FK ON thread_id;
      * for comments that are children of a thread's origin.
      * OPTIONAL
      */
     parent_thread_id?: number;
 
     /**
      * FK ON comment_id;
      * for comments that are responding to another comment.
      * OPTIONAL
      */
     parent_comment_id?: number;
 
     /**
      * Temporary alias to identify a poster with a comment.
      * Contextual to the thread it belongs to.
      * If length is zero, client displays the user's real name or '...'
      * Length: 0 - 45
      * OPTIONAL
      */
     alias?: string;
 
     /**
      * Title for the given comment, one per comment.
      * Length: 1 - 128
      * NON-NULLABLE
      */
     comment_title?: string;
 
     /**
      * Body of a given comment, one per comment.
      * Length: 1 - 25,600
      * OPTIONAL
      */
     content?: string;
 
     /**
      * Record of the time a given comment was created, one per comment
      * NON-NULLABLE
      */
     timestamp?: string;
}
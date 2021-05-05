export interface Thread {
    /**
     * PK AI number for identifying threads
     */
    thread_id?: number
    
    /**
     * FK ON comment_id
     */
    origin_id?: number
}
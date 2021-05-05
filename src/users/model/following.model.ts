export interface Following {
    /**
     * FK PK ON user_id;
     * Identifies the publisher.
     */
    pub_id?: number;

    /**
     * FK PK ON user_id;
     * Identifies the subscribers of a publisher.
     */
    sub_id?:number;
}
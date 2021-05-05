export interface Family {
    /**
     * PK FK ON group_id;
     * Identifies the group paired with the member.
     */
    family_id?: number;

    /**
     * PK FK ON user_id;
     * Identifies the member paired with the group.
     */
    member_id?: number;
}
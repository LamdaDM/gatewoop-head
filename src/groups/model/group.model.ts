export interface Group {
    /**
     * PK AI number for identfying a group.
     * Intended for connecting a group to a family entity.
     */
    group_id?: number;

    /**
     * Name identified with the group.
     * Purely for UI.
     */
    group_name?: string;
    
    /**
     * TYPE Date;
     * Record of the date when group was created.
     */
    date_group_created?: string;
}
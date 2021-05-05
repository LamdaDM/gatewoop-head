export interface User {
    /**
     * PK AI unique identification number.
     */
    user_id?: number;

    /**
    * UNIQUE INDEX identification string.
    * Intended for user's login process.
    * LENGTH: 4 - 60
    * NON-NULLABLE
    */
    iden_name?: string;

    /**
     * User's real name thats displayed when origin_hidden is false and alias is null or empty.
     * LENGTH: 4 - 60
     * NON-NULLABLE
     */
    display_name?: string;

    /**
     * Password for user's authentication.
     * LENGTH: 8 - 60
     * NON-NULLABLE
     */
    password?: string;

    /**
     * Record of the date of the user's creation.
     * TYPE: Date
     * NON-NULLABLE
     */
    date_user_created?: string;

    /**
     * Flag for the client to check when comment's poster's alias is empty.
     * If true while the alias is empty, displays "..." as their name.
     * DEFAULT=false;
     */
     origin_hidden?: boolean;
}
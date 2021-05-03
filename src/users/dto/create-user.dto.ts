import { IsDate, IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class CreateUserDTO {
    /**
     * User's real name for identity.
     * LENGTH: 4 - 32
     * NON-NULLABLE
     */
    @MinLength(4)
    @MaxLength(32)
    @IsNotEmpty()
    name: string;

    /**
     * Password for user's authentication.
     * LENGTH: 8 - 32
     * NON-NULLABLE
     */
    @MinLength(8)
    @MaxLength(32)
    @IsNotEmpty()
    password: string;

    /**
     * Record of the date of the user's creation.
     * TYPE: Date
     * NON-NULLABLE
     */
    @IsDate()
    @IsNotEmpty()
    date_user_created: string;
}
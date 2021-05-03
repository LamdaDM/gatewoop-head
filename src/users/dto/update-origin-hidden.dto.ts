import { IsBoolean } from "class-validator";

export class UpdateOriginHiddenDTO {
    /**
     * Flag for the client to check when comment's poster's alias is empty.
     * If true while the alias is empty, displays "..." as their name.
     * DEFAULT=false;
     */
     @IsBoolean()
     origin_hidden: boolean;
}
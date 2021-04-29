import { IsNotEmpty } from 'class-validator'

export class CreateCommentDTO {
    // FK ON user_id
    @IsNotEmpty()
    poster_id: number;

    // (?) Check for optional decorator
    parent_id: number;

    // SQL.MediumText
    @IsNotEmpty()
    content: string;

    // Check MySQL docs for datetime:format (Th) Check class-validator doc for corresponding format
    @IsNotEmpty()
    timestamp: string;
}
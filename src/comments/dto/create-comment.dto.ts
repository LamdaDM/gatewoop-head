import { IsNotEmpty } from 'class-validator'

export class CreateCommentDTO {
    @IsNotEmpty()
    poster_id: number;

    @IsNotEmpty()
    content: string;

    @IsNotEmpty()
    timestamp: string;
}
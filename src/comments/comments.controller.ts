import { Controller } from "@nestjs/common";
import { CommentsService } from "./comments.service";
import { CreateCommentDTO } from "./dto/create-comment.dto";

@Controller('comments')
export class CommentsController{
    constructor(private commentsService: CommentsService){}
}
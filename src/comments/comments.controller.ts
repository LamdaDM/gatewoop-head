import { Body, Controller, HttpStatus, Param, ParseIntPipe, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt/jwt.auth-guard";
import { CommentsService } from "./comments.service";
import { CreateCommentDTO } from "./dto/create-comment.dto";
import { EditCommentDTO } from "./dto/edit-comment.dto";

@Controller('comments')
export class CommentsController{
    constructor(private commentsService: CommentsService){}

    @UseGuards(JwtAuthGuard)
    @Post('/:thread_id')
    async CreateComment(
        @Param(
            'thread_id', 
            new ParseIntPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST })
        ) THREAD_ID: number,
        @Body() DTO: CreateCommentDTO,
    ){
        return await this.commentsService.addCommentToExistingThread(DTO);
    }

    @UseGuards(JwtAuthGuard)
    @Post('/:comment_id')
    async EditComment(
        @Param(
            'comment_id', 
            new ParseIntPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST })
        ) comment_id: number,
        @Body() dto: EditCommentDTO,
    ){}
}
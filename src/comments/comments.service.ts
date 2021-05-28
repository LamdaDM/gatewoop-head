import { HttpStatus, Injectable } from "@nestjs/common";
import { CreateCommentDTO } from "./dto/create-comment.dto";
import { EditCommentDTO } from "./dto/edit-comment.dto";
import { CommentsRepository } from "./repositories/comments.repository";

@Injectable()
export class CommentsService { 
    constructor(private commentsRepository: CommentsRepository){}
    
    async addCommentToExistingThread(DTO: CreateCommentDTO): Promise<(number | string)[]> {
        const res = await this.commentsRepository.InsertCommentByThreadID(DTO);

        if(res.changedRows !== 1) { return [HttpStatus.NOT_FOUND, res.message]; }
        return [HttpStatus.CREATED, res.insertId];
    }

    async editCommentContent(COMMENT_ID: number, DTO: EditCommentDTO): Promise<number[]> {
        const res = await this.commentsRepository.updateComment_content_ByCommentID(COMMENT_ID, DTO);

        if(res.changedRows !== 1) { return [HttpStatus.NOT_FOUND, res.changedRows] }
        return [HttpStatus.NO_CONTENT, res.changedRows];
    }
}
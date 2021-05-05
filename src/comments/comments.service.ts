import { HttpStatus, Injectable } from "@nestjs/common";
import { PostRes } from "src/config/mysql.conn.provider";
import { CreateCommentDTO } from "./dto/create-comment.dto";
import { EditCommentDTO } from "./dto/edit-comment.dto";
import { CommentsRepository } from "./repositories/comments.repository";

@Injectable()
export class CommentsService { 
    constructor(private commentsRepository: CommentsRepository){}
    
    async addCommentToExistingThread(THREAD_ID: number, DTO: CreateCommentDTO): Promise<PostRes[]> {
        const res = await this.commentsRepository.InsertCommentByThreadID(THREAD_ID, DTO);

        if(res.changedRows !== 1) { return [HttpStatus.NOT_FOUND, res]; }
        return [HttpStatus.CREATED, res];
    }

    async editComment(COMMENT_ID: number, DTO: EditCommentDTO): Promise<PostRes[]> {
        const res = await this.commentsRepository.editCommentByCommentID(COMMENT_ID, DTO);

        if(res.changedRows !== 1) { return [HttpStatus.NOT_FOUND, res.changedRows] }
        return [HttpStatus.NO_CONTENT, res.changedRows];
    }
}
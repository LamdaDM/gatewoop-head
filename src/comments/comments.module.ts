import { Module } from "@nestjs/common";
import { DB_MySQL } from "src/config/mysql.conn";
import { CommentsController } from "./comments.controller";
import { CommentsService } from "./comments.service";
import { CommentsRepository } from "./repositories/comments.repository";

@Module({ 
    controllers: [CommentsController],
    providers: [CommentsService, CommentsRepository, DB_MySQL] 
})
export class CommentsModule {}
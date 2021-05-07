import { Module } from "@nestjs/common";
import { CommonProvidersModule } from "src/config/common.providers.module";
import { CommentsController } from "./comments.controller";
import { CommentsService } from "./comments.service";
import { CommentsRepository } from "./repositories/comments.repository";

@Module({ 
    controllers: [CommentsController],
    imports: [CommonProvidersModule],
    providers: [CommentsService, CommentsRepository] 
})
export class CommentsModule {}
import { Module } from "@nestjs/common";
import { DB_MySQL } from "src/config/mysql.conn";
import { CommentsRepository } from "./repositories/comments.repository";

@Module({ providers: [CommentsRepository, DB_MySQL] })
export class CommentsModule {}
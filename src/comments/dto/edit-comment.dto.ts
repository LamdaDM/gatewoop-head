import { PickType } from "@nestjs/mapped-types";
import { CreateCommentDTO } from "./create-comment.dto";

export class EditCommentDTO extends PickType(CreateCommentDTO, ['content'] as const){}
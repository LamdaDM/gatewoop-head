import { Module } from "@nestjs/common";
import { CommonProvidersModule } from "src/common/common.providers.module";
import { HashService } from "src/common/providers/hash/hash.provider";
import { UsersInternalService } from "src/users/services/users.internal.service";
import { UsersModule } from "src/users/users.module";
import { AuthService } from "./services/auth.service";

@Module({
    imports: [UsersModule, CommonProvidersModule],
    providers: [AuthService, HashService, UsersInternalService]
})
export class AuthModule{}
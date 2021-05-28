import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { jwt_Secret } from "src/common/lib/auth/jwt/jwt.arguments";
import { UsersModule } from "src/users/users.module";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt/jwt.strategy";
import { LocalStrategy } from "./local/local.strategy";

@Module({
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.register({
           secret: jwt_Secret,
           signOptions: { expiresIn: '300s' }
        }),
    ],
    providers: [AuthService, JwtStrategy, LocalStrategy],
    exports: [AuthService, JwtModule]
})
export class AuthModule{}
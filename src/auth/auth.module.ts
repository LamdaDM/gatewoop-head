import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { env } from "node:process";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt/jwt.strategy";
import { LocalStrategy } from "./local/local.strategy";

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
           secret: env.JWT_SECRET,
           signOptions: { expiresIn: '300s' }
        }),
    ],
    providers: [AuthService, JwtStrategy, LocalStrategy],
    exports: [AuthService, JwtModule]
})
export class AuthModule{}
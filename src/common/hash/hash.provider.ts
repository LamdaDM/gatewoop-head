import { Injectable } from "@nestjs/common";
import { TCPServegla2h } from "./tcp-servegla2h/tcp-servegla2h";

@Injectable()
export class HashProvider{

    async hash(password: string): Promise<string> {
        return await TCPServegla2h.passwordHashTCP(password);
    }

    async validate(hash: string, norm: string): Promise<boolean> {
        return await TCPServegla2h.validateAgainstHash(hash, norm);
    }
}
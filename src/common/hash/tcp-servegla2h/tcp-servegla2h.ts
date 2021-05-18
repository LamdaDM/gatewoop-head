import { Injectable } from "@nestjs/common";
import { createConnection, Socket } from "net";
import * as argon2 from "argon2";
import { TCPClient } from "../../lib/tcp-client";
import { servegla2h_Args } from "./tcp-servegla2h.arguments";

/**
 * Provider for creating and validating hashes using `argon2` and `gla2h`.
 * Intended for authentication services and persisting secrets. 
 */
@Injectable()
export class TCPServegla2h {
    /**
     * Uses TCPClient.call and targets the servegla2h service.
     * @param args (string) args parsed and sent into the write stream, formatted as `x/x/x/x`.
     * @param sock (Socket) socket used for communication.
     * @param resolved (callback: Buffer) Callback for handling the data read from the server. 
     * @param rejected (callback: Error) Optional callback for inserting error handling. Error
     * is thrown if no callback is provided.
     */
    static async GLA2H_callServer(
        args: string, 
        sock: Socket, 
        resolved: (res: Buffer) => void, 
        rejected?: (err: Error) => void
        ) {

        const default_reject = (err: Error) => { throw err }

        await TCPClient.call(args, sock)
            .then(resolved)
            .catch(rejected ?? default_reject)
    }

    /**
     * Helper function for GLA2H_callServer,
     * provides a socket and callback to return a string.
     * @param pw (string) password to be hashed
     * @returns The hash, taken from the TCP server's response stream.
     */
    static async passwordHashTCP(pw: string): Promise<string> {
        let hash: string;

        await this.GLA2H_callServer(
            `${pw}/${servegla2h_Args.memcost}/${servegla2h_Args.passes}/${servegla2h_Args.threads}`, 
            createConnection({host: servegla2h_Args.host, port: servegla2h_Args.port}),
            (res => { hash = res.toString('utf-8'); })
        );

        return hash.substr(0, hash.length-1);
    }

    /**
     * Uses `argon2.verify` for validation.
     * @param norm (string) non-hashed string for matcher 
     * @param hash (string) hash for matching
     * @returns (bool) pass or fail for password validation
     */
    static async validateAgainstHash(hash: string, norm: string): Promise<boolean> { 
        return await argon2.verify(hash, norm); 
    }
 }
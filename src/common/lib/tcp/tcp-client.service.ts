import { Injectable } from "@nestjs/common";
import { createConnection, Socket } from "node:net";
import { resolve } from "node:path";

@Injectable()
export class TCPClientService {
    connect(host: string, port: number): Socket {
        return createConnection({host: host, port: port});
    }

    async call(message: string, socket: Socket): Promise<boolean> {
        return new Promise((resolve, reject) => {
            socket.write(Buffer.from(message, "utf-8"));
            
            socket.on('data', (data) => {
                if (data.toString() === "OK") { resolve(true); }
                else { resolve(false); }
                socket.end();
            })
            
            socket.on('error', (err) => {
                reject(err);
                socket.destroy();
            })
        })
    }
}
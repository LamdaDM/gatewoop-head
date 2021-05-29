import { Injectable } from "@nestjs/common";
import { createConnection, Socket } from "net";

@Injectable()
export class TCPClientService {
    connect(host: string, port: number): Socket {
        return createConnection({host: host, port: port});
    }

    async call(message: string, socket: Socket): Promise<Buffer> {
        return new Promise((resolve, reject) => {
            socket.write(Buffer.from(message, "utf-8"));
            
            socket.on('data', (data) => {
                resolve(data);
                socket.end();
            })
            
            socket.on('error', (err) => {
                reject(err);
                socket.destroy();
            })
        })
    }
}
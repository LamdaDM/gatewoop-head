import { Socket } from "net";

/**
 * @deprecated
 */
export class TCPClient {

    /**
     * @deprecated
     * @param message 
     * @param socket 
     * @returns Server response
     */
    static call(message: string, socket: Socket): Promise<Buffer> {

        return new Promise((resolve, reject) => {
            socket.write(Buffer.from(`${message}\n`))

            socket.on('data', function(data) {
                resolve(data);
                socket.end();
            });

            socket.on('error', function(err) {
                reject(err);
                socket.destroy(err);
            })
        })
    }
}
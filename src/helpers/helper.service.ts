import { OkPacket, ResultSetHeader, RowDataPacket } from "mysql2";

export class HelperService {
    async checkDBResponse(packet: (RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader)) {
        if(!packet){ throw new Error(`Connection to database failed.`); }
    }
}